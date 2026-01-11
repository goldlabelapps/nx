---
order: 30
slug: /more/learning-methodologies/spaced-repetition
title: Spaced Repetition
description: Master spaced repetition for long-term retention. Learn how spacing effect research transforms learning efficiency and memory consolidation.
image: https://live.staticflickr.com/65535/55021544964_727c263c48_b.jpg
icon: schedule
tags: ed-tech, learning-science, memory, study-techniques
---
> Spaced Repetition: The Science of Never Forgetting

# Spaced Repetition

Spaced repetition is one of the most powerful, evidence-based learning techniques—capable of dramatically improving long-term retention with less total study time. Understanding and applying spacing effects can transform how you learn and remember information.

## The Forgetting Curve

### Ebbinghaus's Discovery (1885)

**Key Finding**: We forget exponentially without review

**Forgetting Curve**:
```
100% ─┐
      │╲
 80%  │ ╲
      │  ╲___
 60%  │      ╲___
      │          ╲____
 40%  │               ╲_____
      │                     ╲______
 20%  │                            ╲______
      │
  0%  └────────────────────────────────────
      1h   1d    1w    1m    3m    6m
```

**Without Review**:
- 1 hour: Remember 60%
- 1 day: Remember 30%
- 1 week: Remember 10%
- 1 month: Remember ~2%

### Combating Forgetting

**Spaced Review**:
```
Review Schedule:
Day 1: Initial Learning (100%)
Day 2: First Review   (↑ 100%)
Day 4: Second Review  (↑ 100%)
Day 8: Third Review   (↑ 100%)
Day 16: Fourth Review (↑ 100%)
Month 1: (↑ 100%)
Month 3: (↑ 100%)
```

**Result**: Information moves from short-term to long-term memory

## The Spacing Effect

### What Is It?

**Definition**: Information studied over spaced intervals is remembered better than information studied in one session (massing), even with equal total study time.

**Research**:
- Discovered by Ebbinghaus (1885)
- Replicated in 1000+ studies
- One of the most robust findings in psychology
- Works across ages, subjects, and formats

### Why It Works

**1. Encoding Variability**:
- Different contexts at each review
- Multiple retrieval paths created
- Richer memory representations

**2. Effortful Retrieval**:
- Slight forgetting between sessions
- Retrieval effort strengthens memory
- "Desirable difficulty"

**3. Consolidation**:
- Sleep between sessions
- Memory consolidation processes
- Neural connections strengthened

**4. Attention Freshness**:
- Novelty at each review
- Reduced habituation
- Better encoding

## Optimal Spacing

### General Principles

**Expanding Intervals**:
Start short, progressively lengthen

**Example Schedule**:
```
Review 1: 1 day later
Review 2: 3 days later
Review 3: 1 week later
Review 4: 2 weeks later
Review 5: 1 month later
Review 6: 3 months later
Review 7: 6 months later
```

### Factors Affecting Optimal Spacing

**1. Material Difficulty**:
- Easy: Longer intervals
- Hard: Shorter intervals

**2. Retention Goal**:
- Short-term (exam): Closer spacing
- Long-term (career): Wider spacing

**3. Individual Performance**:
- Correct recall: Increase interval
- Incorrect: Reset to shorter interval

**4. Time Until Need**:
- Need in 1 week: Review every 2-3 days
- Need in 1 year: Start with monthly reviews

### The 10-Minute Rule

**First Interval**: 
Review 10 minutes after initial learning for:
- Error correction
- Gap identification
- Active recall practice
- Immediate reinforcement

## Spaced Repetition Systems (SRS)

### How SRS Software Works

**Algorithm** (simplified):
```
If correct:
  new_interval = current_interval × ease_factor
  
If incorrect:
  new_interval = 1 day
  ease_factor = ease_factor - 0.2
```

**Adaptive Scheduling**:
- Tracks every card individually
- Adjusts based on performance history
- Optimises review scheduling
- Prevents over/under-review

### Leading SRS Platforms

**Anki**:
- Most popular SRS
- Highly customizable
- 20+ million flashcards shared
- Mobile and desktop
- Free (iOS paid)

**Features**:
- SM-2 algorithm (Supermemo)
- Image/audio support
- Syncing across devices
- Add-ons and plugins
- Statistics and analytics

**SuperMemo**:
- Original SRS (1985)
- Most advanced algorithm
- Incremental reading
- Complex interface
- Windows only

**Algorithm Evolution**:
- SM-2 (1987): Simple, effective
- SM-15 (2011): Optimal intervals
- SM-17 (2016): Neural networks
- SM-18 (2019): AI optimization

**Quizlet**:
- 500M+ users
- Social features
- Study modes variety
- Teacher tools
- Freemium model

**RemNote**:
- Note-taking + SRS hybrid
- Bidirectional links
- Cloze deletions
- PDF annotation
- Knowledge graph

### Effective Card Creation

**Atomic Cards**:
❌ **Bad**: "What are the features of React?"
✅ **Good**: "What does React's Virtual DOM optimise?"

**One Concept Per Card**:
❌ "What are props and state in React?"
✅ Card 1: "What are props in React?"
✅ Card 2: "What are state in React?"

**Cloze Deletions**:
```
React components can be {{c1::functional}} or 
{{c2::class-based}}, with {{c1::functional}} 
components using {{c3::hooks}} for state management.
```

**Image Occlusion**:
- Screenshot/diagram
- Hide specific parts
- Recall what's hidden
- Perfect for anatomy, geography, diagrams

### Common Pitfalls

**1. Too Many New Cards**:
- Overwhelming review burden
- Burnout
- Start with 5-10/day

**2. Passive Recognition**:
- Reading answer without retrieving
- Not engaging memory
- Use active recall

**3. Context-Free Facts**:
- Isolated information
- No connections
- Link to existing knowledge

**4. Suspended Cards**:
- Letting reviews pile up
- Losing momentum
- Do reviews daily

## Application Strategies

### Language Learning

**Vocabulary Cards**:
```
Front: English word + example sentence
Back: Translation + audio pronunciation

Front: "The cat is *agile* and quick"
Back: 敏捷的 (mǐnjié de) [audio]
```

**Grammar Patterns**:
```
Front: How to form past tense of regular verbs?
Back: Add -ed to base form
Example: walk → walked, play → played
```

**Frequency-Based**:
- Start with most common words
- 1000 words = 75% of daily language
- 3000 words = 90% coverage

### Technical Learning

**Programming Concepts**:
```
Front: What does Array.map() return?
Back: A new array with transformed elements
Code: [1,2,3].map(x => x * 2) // [2,4,6]
```

**API Methods**:
```
Front: How to make a GET request in fetch?
Back: fetch(url).then(res => res.json())
```

**System Design**:
```
Front: What is the CAP theorem?
Back: In distributed systems, you can have only 
2 of 3: Consistency, Availability, Partition tolerance
```

### Academic Subjects

**Mathematics**:
```
Front: Pythagorean theorem formula?
Back: a² + b² = c²
Visual: [right triangle diagram]
```

**Science**:
```
Front: What is photosynthesis?
Back: Plants convert CO₂ + H₂O + light → glucose + O₂
Equation: 6CO₂ + 6H₂O + light → C₆H₁₂O₆ + 6O₂
```

**History**:
```
Front: When did World War II end?
Back: 1945 (VE Day: May 8, VJ Day: Sept 2)
Context: Allied victory, atomic bombs on Japan
```

### Professional Development

**Soft Skills**:
```
Front: STAR method for interviews stands for?
Back: 
- Situation
- Task
- Action
- Result
```

**Business Concepts**:
```
Front: What is the Pareto Principle?
Back: 80% of effects come from 20% of causes
Examples: 80% revenue from 20% customers
```

## Research-Backed Practices

### Retrieval Practice

**Active Recall**:
- Don't flip card immediately
- Speak answer out loud
- Write it down
- Check accuracy

**Benefits**:
- Strengthens memory trace
- Identifies knowledge gaps
- Metacognitive awareness
- Better than re-reading

### Interleaving

**Spaced + Mixed Topics**:
Don't:
```
10 algebra problems
10 geometry problems
10 trigonometry problems
```

Do:
```
Algebra, geometry, trig, algebra, trig, 
geometry, algebra, geometry, trig, algebra
```

**Benefit**: Forces discrimination between problem types

### Pre-Testing

**Study Before You Know**:
1. Attempt cards before learning
2. Fail (expected)
3. Then study material
4. Review cards again

**Why**: Primes brain for information, improves encoding

### Spacing Within Sessions

**Don't**: Review same card multiple times in one session
**Do**: Space even within session (20+ cards between repeats)

## Optimizing Your System

### Daily Routine

**Consistency Over Volume**:
- 15 minutes daily > 2 hours weekly
- Morning reviews (best retention)
- Review before forgetting
- Never skip more than 2 days

**Manageable Load**:
```
Start: 5 new cards/day
Week 1: 35 cards total
Week 2: +5 new = 40 reviews
Month 1: ~75 reviews/day
Month 6: ~150 reviews/day (steady state)
```

### Maintenance Schedule

**New Material**: 5-20 cards/day
**Review Time**: 10-30 minutes/day
**Long-Term**: Sustainable forever

### When to Graduate Cards

**Criteria**:
- Correctly recalled 5+ times
- Over 6+ month period
- With increasing intervals
- Consistently easy

**Result**: Move to "known" deck, occasional review only

## Beyond Flashcards

### Spaced Reading

**Incremental Reading** (SuperMemo):
1. Import article
2. Read sections over time
3. Create cards from highlights
4. Review spaced-ly

### Spaced Writing

**Technique**:
1. Write summary after lecture
2. Rewrite from memory next day
3. Rewrite again 3 days later
4. Compare to original

### Spaced Projects

**Software Projects**:
- Return to old projects monthly
- Refactor with new knowledge
- Reinforces learning
- Practical application

## Limitations and Misconceptions

### What Spacing Doesn't Do

**Not Magic**:
- Still requires understanding
- Can't replace initial learning
- Won't fix poor encoding
- Needs active engagement

**Not for Everything**:
- Complex problem-solving
- Creative thinking
- Physical skills
- Procedural knowledge

### When NOT to Use SRS

- Cramming for tomorrow's test
- One-time information
- Constantly changing info (news)
- Information you use daily (already spaced naturally)

## Measuring Success

### Metrics

**Retention Rate**:
- Target: 80-90%
- Too high (>95%): Intervals too short
- Too low (<70%): Intervals too long

**Review Burden**:
- Manageable: 10-30 min/day
- Overwhelming: >1 hour/day
- Adjust new cards accordingly

**Long-Term Growth**:
- Track known cards
- Measure cumulative learning
- Celebrate milestones

## Combining with Other Techniques

### Spaced + Elaboration

**Each Review**:
- Explain in own words
- Create analogies
- Connect to prior knowledge
- Add context

### Spaced + Testing

**Practice Tests**:
- Space practice exams
- Review missed questions
- Create cards for errors
- Exponentially space retests

### Spaced + Teaching

**Feynman Technique**:
1. Learn concept
2. Teach it (day later)
3. Identify gaps
4. Review & teach again (3 days)
5. Simplify explanation (1 week)

## Getting Started

### Week 1: Foundation

**Day 1-2**: Choose platform (Anki recommended)
**Day 3-4**: Create 10 cards from current learning
**Day 5-7**: Add 5 new cards daily, do reviews

### Month 1: Building Habit

- Daily reviews (no exceptions)
- 5-10 new cards/day
- Focus on high-value information
- Refine card quality

### Long-Term: Mastery

- Sustainable pace
- Regular deck maintenance
- Archive mastered content
- Expand to new domains

## Tools and Resources

### Software

**Anki**: https://apps.ankiweb.net (Free, recommended)
**AnkiWeb**: Web version + syncing
**AnkiDroid**: Android app
**AnkiMobile**: iOS app ($25)

**Alternatives**:
- RemNote
- Quizlet
- Memrise
- Mnemosyne

### Pre-Made Decks

**Language**: Frequency lists, grammar
**Medical**: AnKing, Zanki
**Programming**: CS fundamentals
**Certification**: AWS, PMP, etc.

**Caution**: Customise to your needs

### Research Papers

- Cepeda et al. (2006): Spacing effect meta-analysis
- Karpicke & Roediger (2008): Retrieval practice
- Dunlosky et al. (2013): Learning techniques effectiveness

## Next Steps

Apply spaced repetition:
- Complement [Learning Methodologies](/learning-methodologies)
- Enhance [Microlearning](/microlearning) effectiveness
- Support [English for Developers](/english-for-developers) vocabulary
- Reinforce [Technical Writing](/technical-writing) principles

Spaced repetition transforms learning from cramming to long-term mastery. Start small, stay consistent, and trust the science—your future self will thank you.
