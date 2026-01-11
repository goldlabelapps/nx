---
order: 11
slug: /more/code-review-communication
title: Code Review
description: Master the art of code review communication. Learn to give and receive constructive feedback, write clear PR descriptions, and build collaborative development culture.
image: https://live.staticflickr.com/65535/55021544964_727c263c48_b.jpg
icon: rate_review
tags: ed-tech, code-review, feedback, collaboration
---
> Code Review Communication | Constructive Feedback for Developers

# Code Review Communication

Code reviews are where technical skill meets interpersonal communication. Poor code review communication creates conflict, slows development, and damages team culture. Excellent code review communication improves code quality, shares knowledge, and builds trust.

## The Importance of Code Review Communication

### Beyond Finding Bugs
Code reviews serve multiple purposes:
- Knowledge sharing across the team
- Maintaining code quality standards
- Mentoring junior developers
- Preventing production issues
- Documenting decisions and tradeoffs

### Communication is the Challenge
Most code review conflict stems from communication issues, not technical disagreements. How you say something matters as much as what you say.

## Writing Excellent Pull Request Descriptions

### The PR Description Template

```markdown
## What
Brief summary of changes

## Why
Problem being solved or feature being added

## How
Technical approach taken

## Testing
How changes were verified

## Screenshots/Demos
Visual evidence (if applicable)

## Notes
Anything reviewers should know
```

### Best Practices
- Write the description for reviewers, not yourself
- Link to relevant tickets or documentation
- Highlight areas where you want specific feedback
- Explain non-obvious decisions
- Call out any technical debt or compromises

### Common Mistakes
- "fix bug" - Useless description
- Assuming context everyone knows
- No mention of testing approach
- Burying important information

## Giving Constructive Code Review Feedback

### The Golden Rules

**1. Review Code, Not People**
❌ "You always write messy code"
✅ "This function could be more readable by..."

**2. Ask Questions, Don't Make Demands**
❌ "Change this to use async/await"
✅ "Would async/await make this clearer? I find it easier to read."

**3. Provide Specific, Actionable Feedback**
❌ "This is confusing"
✅ "Consider renaming `getData()` to `fetchUserProfile()` to clarify what data is being retrieved"

**4. Explain Your Reasoning**
❌ "Don't use var"
✅ "Using `const` instead of `var` prevents accidental reassignment and makes intent clearer"

**5. Acknowledge Good Work**
❌ "LGTM"
✅ "Nice error handling here! The user-friendly messages will help a lot."

### Comment Types and When to Use Them

**Critical**: Blocks merge, must be fixed
- Security vulnerabilities
- Breaking changes
- Obvious bugs

**Suggestion**: Should be addressed but not blocking
- Code style improvements
- Performance optimizations
- Readability enhancements

**Nitpick**: Optional, nice-to-have
- Formatting preferences (if not automated)
- Variable naming when current name is acceptable
- Alternative approaches that aren't clearly better

**Question**: Seeking understanding
- Asking about design decisions
- Clarifying intent
- Understanding tradeoffs

**Praise**: Acknowledging good work
- Clever solutions
- Excellent tests
- Clear documentation

### Language Patterns That Work

**Suggesting Improvements**:
- "Consider..."
- "What do you think about..."
- "Would it be clearer if..."
- "Another approach might be..."

**Expressing Concerns**:
- "I'm concerned that..."
- "This might cause issues when..."
- "Have we considered..."

**Requesting Changes**:
- "Please update..."
- "This needs to change because..."
- "For security, we must..."

## Receiving Code Review Feedback

### The Right Mindset
- Reviews improve your code, not criticize you
- Questions aren't attacks
- Feedback is a gift of time and attention
- Everyone's code needs review

### Responding to Feedback

**Acknowledge Feedback**:
- "Good catch, fixed"
- "Updated in commit abc123"
- "You're right, I'll change this"

**Explain Your Reasoning**:
- "I chose this approach because..."
- "The alternative would require..."

**Ask for Clarification**:
- "Can you elaborate on..."
- "Could you provide an example of..."
- "I don't understand how this causes..."

**Disagree Professionally**:
- "I see your point, but I think this approach is better because..."
- "I considered that, but decided against it because..."

### Red Flags in Your Responses
- Defensive tone
- Taking feedback personally
- Arguing every point
- Dismissing concerns without explanation
- Making changes without acknowledging feedback

## Cultural Differences in Code Reviews

### Direct vs. Indirect Communication
Some cultures value direct feedback; others prefer diplomatic phrasing. Global teams need explicit norms.

**Direct Style** (common in US, Germany, Netherlands):
- "This won't work in production"
- Straightforward criticism expected

**Indirect Style** (common in many Asian cultures):
- "Perhaps we could consider another approach"
- Criticism wrapped in politeness

### Hierarchy and Authority
Some cultures defer to senior developers more than others. Create safe spaces for junior reviewers.

### Face-Saving
Public criticism can be painful in cultures with high face-consciousness. Consider DMs for sensitive feedback.

## Code Review Anti-Patterns

### The Nitpicker
Blocks PRs over formatting preferences already covered by linters.

### The Rubber Stamper
Approves everything without thorough review.

### The Bike-Shedder
Spends hours discussing trivial naming while missing architectural issues.

### The Ghostwriter
Leaves dozens of comments expecting author to rewrite everything.

### The Gatekeeper
Uses reviews to assert dominance or block progress.

## Building a Positive Review Culture

### Team Agreements
- Maximum PR size
- Expected review turnaround time
- What's blocking vs. non-blocking
- How to escalate disagreements

### Automate the Automatable
- Use formatters (Prettier, Black)
- Run linters in CI
- Automate style enforcement
- Use agreed-upon templates

### Share the Load
- Rotate reviewers
- Distribute knowledge
- Mentor through reviews
- Celebrate good reviews

## English Language Considerations

### For Non-Native Speakers Giving Reviews
- Use simple, clear language
- Prefer questions over statements
- Use code examples to clarify
- It's OK to be more formal than native speakers

### For Non-Native Speakers Receiving Reviews
- Ask for clarification if unsure
- Don't assume criticism from terse comments
- Native speakers also find reviews stressful
- Your English improving code is more valuable than perfect English

### Common English Patterns
- "Could you..." (polite request)
- "Might want to..." (gentle suggestion)  
- "Looks good, just one small thing..." (minimizing criticism)
- "LGTM" = Looks Good To Me (approval)
- "WDYT?" = What Do You Think?

## Measuring Code Review Health

### Healthy Metrics
- Review turnaround time < 24 hours
- Average comments per PR = 2-5
- Approval rate > 90%
- Few back-and-forth rounds

### Unhealthy Signals
- PRs stuck in review for days
- Dozens of comments per PR
- Many PRs changed dramatically after review
- Team members avoiding certain reviewers

## Improving Your Code Review Communication

Practice makes perfect:
1. Study excellent reviewers on your team
2. Request feedback on your review style
3. Experiment with different phrasing
4. Reflect on reviews that went poorly
5. Build empathy through perspective-taking

Great code review communication strengthens both your code and your team.
