
import { NextResponse } from 'next/server';
import { makeRes } from '../../';
import { getFirebaseStorage, getFirebaseFirestore } from '../../../NX/lib/firebase';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { collection, addDoc } from 'firebase/firestore';

export async function POST(req: Request) {
    try {
        const contentType = req.headers.get('content-type') || '';
        console.log('content-type:', contentType);
        if (!contentType.startsWith('multipart/form-data')) {
            console.error('Invalid content type');
            return NextResponse.json(makeRes({ severity: 'error', message: 'Invalid content type' }), { status: 400 });
        }

        // Parse form data
        const formData = await req.formData();
        const file = formData.get('file');
        const uid = formData.get('uid');
        console.log('formData file:', file);
        console.log('formData uid:', uid);
        if (!file || typeof file === 'string' || !uid) {
            console.error('Missing file or uid', { file, uid });
            return NextResponse.json(makeRes({ severity: 'error', message: 'Missing file or uid' }), { status: 400 });
        }

        // Validate file type
        const allowedTypes = ['image/webp', 'image/png', 'image/jpeg', 'image/svg+xml'];
        console.log('file.type:', file.type);
        if (!allowedTypes.includes(file.type)) {
            console.error('Invalid file type', file.type);
            return NextResponse.json(makeRes({ 
                severity: 'error', 
                message: 'Invalid file type' 
            }), { status: 400 });
        }

        // Prepare Firebase Storage
        const storage = getFirebaseStorage();
        console.log('Firebase storage initialized');
        const avatarsRef = ref(storage, `avatars/${uid}_${Date.now()}`);
        let uploadResult;
        try {
            uploadResult = await uploadBytes(avatarsRef, file);
            console.log('uploadResult:', uploadResult);
        } catch (uploadErr) {
            console.error('uploadBytes error:', uploadErr);
            throw uploadErr;
        }
        let src;
        try {
            src = await getDownloadURL(uploadResult.ref);
            console.log('downloadURL:', src);
        } catch (urlErr) {
            console.error('getDownloadURL error:', urlErr);
            throw urlErr;
        }

        // Prepare Firestore
        const firestore = getFirebaseFirestore();
        console.log('Firebase firestore initialized');
        const avatarsCol = collection(firestore, 'avatars');
        const avatarDoc = {
            uid,
            created: Date.now(),
            src,
        };
        try {
            await addDoc(avatarsCol, avatarDoc);
            console.log('avatarDoc added:', avatarDoc);
        } catch (firestoreErr) {
            console.error('addDoc error:', firestoreErr);
            throw firestoreErr;
        }

        return NextResponse.json(makeRes({ severity: 'success', message: 'Avatar uploaded', data: avatarDoc }));
    } catch (error: any) {
        console.error('POST /api/avatars/upload error:', error, error?.stack);
        return NextResponse.json(makeRes({ severity: 'error', message: error.message || 'Upload failed', error }), { status: 500 });
    }
}
