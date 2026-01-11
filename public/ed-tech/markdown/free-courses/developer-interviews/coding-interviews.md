---
order: 48
slug: /developer-interviews/coding-interviews
title: Coding Interviews
description: Master coding interviews with effective problem-solving strategies, communication techniques, and common algorithmic patterns for technical interviews.
image: https://live.staticflickr.com/65535/55030591105_99dcef2a44_b.jpg
icon: code
tags: ed-tech, interviews, coding, algorithms
---
> Coding Interviews: Mastering Technical Problem-Solving

# Coding Interviews

Coding interviews test your ability to solve algorithmic problems under pressure while communicating your thought process. Success requires technical skills, problem-solving strategies, and effective communication—especially in English.

## What Are Coding Interviews?

### Format

**Typical Structure** (45-60 minutes):
```
Introduction (5 min):
- Greetings and rapport building
- Interview format explanation

Problem Solving (35-45 min):
- Problem presentation
- Clarification questions
- Approach discussion
- Implementation
- Testing and optimization

Q&A (5-10 min):
- Your questions for interviewer
```

**Common Platforms**:
- CoderPad (web-based code editor)
- HackerRank
- LeetCode (built-in interview mode)
- Company-specific platforms
- Sometimes: whiteboard or Google Doc

### What They're Evaluating

**Technical Skills** (40%):
```
✓ Algorithm knowledge
✓ Data structure selection
✓ Code correctness
✓ Time/space complexity analysis
✓ Bug-free implementation
```

**Problem-Solving** (30%):
```
✓ Approach formulation
✓ Edge case identification
✓ Optimization thinking
✓ Testing methodology
```

**Communication** (30%):
```
✓ Thought process clarity
✓ Asking clarifying questions
✓ Explaining decisions
✓ Responding to feedback
✓ Collaborative problem-solving
```

## The Problem-Solving Framework

### Step 1: Understand (5 minutes)

**Read Carefully**:
```
Problem: "Given an array of integers, return indices 
of two numbers that add up to a target."

Key information:
- Input: Array of integers, target integer
- Output: Indices (positions) of two numbers
- Constraint: Two numbers must sum to target
```

**Ask Clarifying Questions**:
```
Essential questions:

1. Input constraints:
   "What's the size range of the array?"
   "Can numbers be negative?"
   "Can the array be empty?"

2. Output format:
   "Should I return indices in any order?"
   "What if multiple pairs exist?"
   "What if no solution exists?"

3. Edge cases:
   "Can I use the same element twice?"
   "Is the array sorted?"

4. Performance:
   "Are there constraints on time complexity?"
   "Should I optimize for space?"
```

**Example Dialogue**:
```
You: "Just to clarify—if the array is [2, 7, 11, 15] 
     and target is 9, I should return [0, 1] because 
     2 + 7 = 9. Is that correct?"

Interviewer: "Yes, exactly."

You: "And what if there's no valid pair?"

Interviewer: "You can assume there's always exactly one solution."

You: "Got it. And can the same element be used twice? 
     For example, if the array is [3, 3] and target is 6?"

Interviewer: "No, you must use two different indices."

You: "Perfect, thank you."
```

### Step 2: Examples (3 minutes)

**Create Test Cases**:
```
Problem: Two Sum

Test case 1 (provided):
Input: [2, 7, 11, 15], target = 9
Output: [0, 1]
Explanation: 2 + 7 = 9

Test case 2 (simple):
Input: [1, 2], target = 3
Output: [0, 1]

Test case 3 (larger):
Input: [3, 2, 4], target = 6
Output: [1, 2]
Explanation: 2 + 4 = 6 (not 3 + 3)

Test case 4 (negative numbers):
Input: [-1, -2, -3, 5], target = 2
Output: [1, 3]
Explanation: -2 + 5 = 2
```

**Walk Through Example**:
```
You: "Let me walk through an example to make sure 
     I understand. With [2, 7, 11, 15] and target 9:
     
     - Check 2: need 7 (9-2=7)
     - Found 7 at index 1
     - Return [0, 1]
     
     Does this match what you expect?"

Interviewer: "Yes, that's right."
```

### Step 3: Approach (7 minutes)

**Brute Force First**:
```
You: "Let me start with a brute force approach to 
     make sure we have a working solution, then we 
     can optimize.
     
     I could check every pair of numbers:
     - Nested loop: for each element, check all others
     - If they sum to target, return their indices
     - Time complexity: O(n²)
     - Space complexity: O(1)
     
     This would work, but with a large array, it might 
     be too slow."
```

**Think Out Loud - Optimization**:
```
You: "To optimize, I'm thinking about what we're doing 
     repeatedly. For each number, we're searching for 
     its complement—the number that adds up to the target.
     
     If I store numbers I've seen in a hash map with their 
     indices, I can check if the complement exists in O(1) 
     time instead of O(n).
     
     So the optimized approach:
     - Create hash map
     - For each number:
       - Calculate complement (target - number)
       - Check if complement is in hash map
       - If yes: return indices
       - If no: add current number to hash map
     
     Time complexity: O(n) - single pass
     Space complexity: O(n) - hash map storage
     
     Does this approach sound good?"

Interviewer: "Yes, that sounds great."
```

### Step 4: Implement (20-25 minutes)

**Code While Explaining**:
```python
You: "I'll start by creating the hash map to store 
     numbers we've seen..."

def two_sum(nums, target):
    """
    Find two numbers that add up to target.
    
    Args:
        nums: List of integers
        target: Target sum
    
    Returns:
        List of two indices
    """
    # Dictionary to store number -> index
    seen = {}
    
    You: "Now I'll iterate through the array..."
    
    for i, num in enumerate(nums):
        You: "For each number, I calculate the complement..."
        
        complement = target - num
        
        You: "Check if we've seen the complement before..."
        
        if complement in seen:
            You: "If yes, we found our pair! Return the indices."
            return [seen[complement], i]
        
        You: "Otherwise, store this number for future lookups..."
        seen[num] = i
    
    You: "This should never happen based on problem constraints, 
         but good practice to handle..."
    return []  # No solution found
```

**Handle Interruptions Gracefully**:
```
Interviewer: "What if the array has duplicates?"

You: "Good question! Let me think... In this approach, 
     if we have [3, 3] and target 6, when we process 
     the second 3:
     - complement = 6 - 3 = 3
     - We check if 3 is in 'seen' (it is, from first 3)
     - We return [0, 1]
     
     So it handles duplicates correctly because we store 
     the index before checking, ensuring we use different 
     indices. Does that make sense?"

Interviewer: "Yes, perfect."
```

### Step 5: Test (5-7 minutes)

**Walk Through Example**:
```
You: "Let me test with the example [2, 7, 11, 15], target = 9:

Step by step:
i=0, num=2:
  - complement = 9 - 2 = 7
  - 7 not in seen {}
  - Add to seen: {2: 0}

i=1, num=7:
  - complement = 9 - 7 = 2
  - 2 in seen? Yes! at index 0
  - Return [0, 1] ✓

Result: [0, 1] - Correct!"
```

**Test Edge Cases**:
```
You: "Let me check edge cases:

1. Small array [1, 2], target = 3:
   - Process 1: seen = {1: 0}
   - Process 2: complement = 1, found at index 0
   - Return [0, 1] ✓

2. Negative numbers [-1, -2, 5], target = 3:
   - Process -1: seen = {-1: 0}
   - Process -2: seen = {-1: 0, -2: 1}
   - Process 5: complement = -2, found at index 1
   - Return [1, 2] ✓

3. Large numbers work same way due to O(n) complexity ✓

I think this solution is solid."
```

### Step 6: Optimize (3-5 minutes)

**Analyze Complexity**:
```
You: "Let me analyze the complexity:

Time: O(n)
- Single pass through array
- Hash map lookup/insert is O(1)
- Overall: O(n)

Space: O(n)
- Hash map stores up to n elements
- Overall: O(n)

This is optimal for this problem—we can't do better than 
O(n) time because we must examine each element at least once."
```

**Discuss Improvements**:
```
You: "If I had more time, I might add:

1. Input validation:
   - Check if array is None or empty
   - Validate target is an integer

2. Better error handling:
   - Raise exception if no solution (instead of empty list)
   - Add custom exception type

3. Documentation:
   - Add more examples in docstring
   - Document assumptions

But for the core algorithm, this is optimal."
```

## Common Problem Patterns

### Pattern 1: Two Pointers

**When to Use**:
- Sorted array problems
- Finding pairs/triplets
- Removing duplicates

**Example - Valid Palindrome**:
```python
def is_palindrome(s: str) -> bool:
    """Check if string is palindrome, ignoring non-alphanumeric."""
    
    # Communication: "I'll use two pointers from both ends"
    left, right = 0, len(s) - 1
    
    while left < right:
        # Communication: "Skip non-alphanumeric characters"
        while left < right and not s[left].isalnum():
            left += 1
        while left < right and not s[right].isalnum():
            right -= 1
        
        # Communication: "Compare characters (case-insensitive)"
        if s[left].lower() != s[right].lower():
            return False
        
        left += 1
        right -= 1
    
    return True
```

**Explanation Template**:
```
"I'll use the two-pointer pattern here. Starting from both 
ends of the array/string, I'll move pointers toward each 
other based on [condition]. This gives us O(n) time and 
O(1) space."
```

### Pattern 2: Sliding Window

**When to Use**:
- Subarray/substring problems
- Finding min/max of subarrays
- Contains/frequency problems

**Example - Longest Substring Without Repeating Characters**:
```python
def length_of_longest_substring(s: str) -> int:
    """Find length of longest substring without repeating characters."""
    
    # Communication: "I'll use sliding window with hash set"
    char_set = set()
    left = 0
    max_length = 0
    
    # Communication: "Right pointer expands window"
    for right in range(len(s)):
        # Communication: "If duplicate found, shrink from left"
        while s[right] in char_set:
            char_set.remove(s[left])
            left += 1
        
        # Communication: "Add current character and update max"
        char_set.add(s[right])
        max_length = max(max_length, right - left + 1)
    
    return max_length
```

**Explanation Template**:
```
"This is a sliding window problem. I'll maintain a window 
that satisfies [condition]. When condition is violated, 
I'll shrink the window from the left. Track the maximum 
valid window size throughout."
```

### Pattern 3: Fast and Slow Pointers

**When to Use**:
- Cycle detection
- Finding middle of list
- Linked list problems

**Example - Detect Cycle in Linked List**:
```python
def has_cycle(head: ListNode) -> bool:
    """Detect if linked list has a cycle using Floyd's algorithm."""
    
    # Communication: "Using fast and slow pointers to detect cycle"
    if not head or not head.next:
        return False
    
    slow = fast = head
    
    # Communication: "Slow moves 1 step, fast moves 2 steps"
    while fast and fast.next:
        slow = slow.next
        fast = fast.next.next
        
        # Communication: "If they meet, there's a cycle"
        if slow == fast:
            return True
    
    # Communication: "If fast reaches end, no cycle"
    return False
```

### Pattern 4: Hash Map/Set

**When to Use**:
- Counting frequencies
- Detecting duplicates
- Fast lookup needed

**Example - Group Anagrams**:
```python
from collections import defaultdict

def group_anagrams(strs: list[str]) -> list[list[str]]:
    """Group strings that are anagrams of each other."""
    
    # Communication: "Use hash map with sorted string as key"
    anagram_groups = defaultdict(list)
    
    for s in strs:
        # Communication: "Sorted string is same for all anagrams"
        key = ''.join(sorted(s))
        anagram_groups[key].append(s)
    
    # Communication: "Return all groups as list of lists"
    return list(anagram_groups.values())
```

### Pattern 5: Binary Search

**When to Use**:
- Sorted array search
- Finding boundaries
- Optimization problems (find minimum X that satisfies Y)

**Example - Search in Rotated Sorted Array**:
```python
def search(nums: list[int], target: int) -> int:
    """Search for target in rotated sorted array."""
    
    # Communication: "Modified binary search accounting for rotation"
    left, right = 0, len(nums) - 1
    
    while left <= right:
        mid = (left + right) // 2
        
        if nums[mid] == target:
            return mid
        
        # Communication: "Determine which half is sorted"
        if nums[left] <= nums[mid]:  # Left half sorted
            # Communication: "Check if target is in sorted half"
            if nums[left] <= target < nums[mid]:
                right = mid - 1
            else:
                left = mid + 1
        else:  # Right half sorted
            if nums[mid] < target <= nums[right]:
                left = mid + 1
            else:
                right = mid - 1
    
    return -1
```

### Pattern 6: DFS/BFS (Tree/Graph)

**When to Use**:
- Tree traversal
- Graph traversal
- Path finding

**Example - Binary Tree Level Order Traversal (BFS)**:
```python
from collections import deque

def level_order(root: TreeNode) -> list[list[int]]:
    """Return level-order traversal of binary tree."""
    
    if not root:
        return []
    
    # Communication: "Using BFS with queue for level-order"
    result = []
    queue = deque([root])
    
    while queue:
        level_size = len(queue)
        current_level = []
        
        # Communication: "Process all nodes at current level"
        for _ in range(level_size):
            node = queue.popleft()
            current_level.append(node.val)
            
            # Communication: "Add children for next level"
            if node.left:
                queue.append(node.left)
            if node.right:
                queue.append(node.right)
        
        result.append(current_level)
    
    return result
```

### Pattern 7: Dynamic Programming

**When to Use**:
- Optimization problems (max/min)
- Counting problems
- Problems with overlapping subproblems

**Example - Climbing Stairs**:
```python
def climb_stairs(n: int) -> int:
    """Count ways to climb n stairs (1 or 2 steps at a time)."""
    
    # Communication: "Classic DP problem, like Fibonacci"
    if n <= 2:
        return n
    
    # Communication: "dp[i] = ways to reach step i"
    dp = [0] * (n + 1)
    dp[1] = 1  # 1 way to reach step 1
    dp[2] = 2  # 2 ways to reach step 2 (1+1 or 2)
    
    # Communication: "Each step can be reached from previous two"
    for i in range(3, n + 1):
        dp[i] = dp[i-1] + dp[i-2]
    
    return dp[n]
```

## Communication During Coding

### Think-Aloud Strategies

**What to Say**:
```
While writing code:

✓ "I'm creating a helper function to..."
✓ "This handles the edge case where..."
✓ "I'm using this data structure because..."
✓ "Let me add a comment here to explain..."

When stuck:

✓ "I'm considering two approaches: A and B..."
✓ "Let me think through this edge case..."
✓ "Can I take a moment to think about this?"

When making decisions:

✓ "I'm choosing X over Y because..."
✓ "The tradeoff here is..."
✓ "For this problem, I think X is better because..."
```

**What NOT to Say**:
```
❌ Long silences (> 30 seconds)
❌ "I don't know"
❌ "I'm bad at this type of problem"
❌ "This is impossible"
❌ Talking about unrelated topics
```

### Handling Hints

**Interviewer Gives Hint**:
```
Interviewer: "Have you considered using a hash map?"

Good response:
✓ "Oh, great suggestion! So instead of searching 
   through the array each time, I could store elements 
   in a hash map for O(1) lookup. Let me think about 
   how that would work..."

Bad response:
❌ "I was just about to do that" (defensive)
❌ "But I want to try my way first" (ignoring feedback)
❌ Silently implementing without acknowledgment
```

### Stuck? Use This Script

**When Truly Stuck**:
```
1. Acknowledge:
   "I'm stuck on [specific part]. Let me think through 
   what I know..."

2. Recap:
   "So far I know: [what you've figured out]"

3. Identify gap:
   "What I'm unsure about is [specific question]"

4. Ask:
   "Could you give me a hint about [specific aspect]?"
   
   Or: "Would it help if I explained my thought process?"
```

## Common Coding Interview Questions

### Easy Level

**Array/String**:
- Two Sum
- Valid Palindrome
- Best Time to Buy and Sell Stock
- Contains Duplicate
- Valid Anagram

**Linked List**:
- Reverse Linked List
- Merge Two Sorted Lists
- Linked List Cycle

**Tree**:
- Maximum Depth of Binary Tree
- Same Tree
- Invert Binary Tree

### Medium Level

**Array/String**:
- 3Sum
- Longest Substring Without Repeating Characters
- Container With Most Water
- Group Anagrams

**Linked List**:
- Add Two Numbers
- Remove Nth Node From End
- Copy List with Random Pointer

**Tree**:
- Binary Tree Level Order Traversal
- Validate Binary Search Tree
- Lowest Common Ancestor

**Dynamic Programming**:
- Coin Change
- Longest Increasing Subsequence
- House Robber

### Hard Level

**Array**:
- Trapping Rain Water
- Median of Two Sorted Arrays

**String**:
- Minimum Window Substring

**Tree**:
- Binary Tree Maximum Path Sum
- Serialize and Deserialize Binary Tree

**Dynamic Programming**:
- Edit Distance
- Regular Expression Matching

## Time Management

### Time Allocation

**45-minute interview**:
```
Understanding (5 min):
- Read problem
- Ask clarifying questions
- Create examples

Planning (5 min):
- Discuss brute force
- Optimize approach
- Confirm approach

Implementation (25 min):
- Write code
- Think aloud
- Handle questions

Testing (7 min):
- Walk through examples
- Test edge cases
- Discuss improvements

Buffer (3 min):
- Unexpected issues
- Additional questions
```

### If Running Out of Time

**Priority Order**:
```
1. Working brute force > Buggy optimal solution
2. Pseudocode with explanation > Incomplete code
3. Discuss optimization > Implement poorly

If 10 minutes left and not done:

You: "I'm running short on time. Would you prefer I:
     - Complete this implementation, or
     - Explain the optimal approach without coding it, or
     - Write pseudocode for the optimization?"
```

## Practice Resources

### Online Platforms

**LeetCode**:
- Best for pattern recognition
- Discuss section has explanations
- Mock interview feature
- Sort by company-specific questions

**HackerRank**:
- Good for beginners
- Clear problem statements
- Multiple test cases visible

**AlgoExpert**:
- Video explanations
- Categorized by pattern
- Interview prep roadmap

### Practice Strategy

**Week 1-2: Foundations**:
```
- 2-3 easy problems daily
- Focus on arrays, strings
- Master basic patterns
- Practice explaining solutions
```

**Week 3-4: Patterns**:
```
- 1-2 medium problems daily
- Learn common patterns
- Time yourself
- Practice thinking aloud
```

**Week 5-6: Mock Interviews**:
```
- Full interview simulation
- Find practice partner
- Record yourself
- Get feedback
```

## Next Steps

Explore related topics:
- [System Design Interviews](/developer-interviews/system-design-interviews)
- [Behavioral Interviews](/developer-interviews/behavioral-interviews)
- [Interview Communication](/developer-interviews/interview-communication)
- [Interview English](/developer-interviews/interview-english)
- [Developer Interview Preparation](/developer-interviews)

Remember: Coding interviews test problem-solving and communication as much as coding ability. Practice explaining your thinking clearly, and don't be afraid to ask questions. The interviewer wants you to succeed!
