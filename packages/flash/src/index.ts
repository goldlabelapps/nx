import Flash from './Flash';
import MovieClip from './MovieClips/MovieClip';
import Text from './MovieClips/Text/Text';
import { Chatbot, ChatbotAS } from './MovieClips/Chatbot';
import { setFlash } from './lib/actions/setFlash';
import { useFlash } from './lib/hooks/useFlash';
import { useIsMobile } from './lib/hooks/useIsMobile';
import { usePrefersColorScheme } from './lib/hooks/usePrefersColorScheme';
import Macromedia from './MovieClips/Icons/Macromedia';
import LightningBolt from './MovieClips/Lightning/LightningBolt';
import AnimateFlashLogo from './ActionScript/AnimateFlashLogo';
import FlashBadge from './FlashBadge';

export {
    Flash,
    MovieClip,
    Text,
    useFlash,
    setFlash,
    useIsMobile,
    usePrefersColorScheme,
    Macromedia,
    LightningBolt,
    Chatbot,
    AnimateFlashLogo,
    ChatbotAS,
    FlashBadge,
};
