---
order: 49
slug: /interviews/system-design-interviews
title: System Design
description: Master system design interviews with proven frameworks, scalability patterns, and effective communication strategies for technical architecture discussions.
tags: ed-tech, interviews, system-design, architecture
---
> System Design Interviews: Architecting Scalable Systems Under Pressure

# System Design Interviews

System design interviews evaluate your ability to design large-scale distributed systems. Unlike coding interviews with right answers, these are open-ended discussions where communication, tradeoff analysis, and structured thinking matter as much as technical knowledge.

## What Are System Design Interviews?

### Format

**Typical Structure** (45-90 minutes):
```
Problem Statement (5 min):
- Interviewer presents system to design
- Examples: "Design Twitter", "Design URL shortener"

Requirements Gathering (10-15 min):
- Clarify functional requirements
- Define non-functional requirements
- Establish scale and constraints

High-Level Design (15-20 min):
- Draw major components
- Explain data flow
- Discuss technology choices

Deep Dive (20-30 min):
- Drill into specific components
- Discuss bottlenecks
- Propose optimizations

Wrap Up (5-10 min):
- Discuss tradeoffs
- Your questions
```

### What They're Evaluating

**Technical Knowledge** (30%):
```
✓ System architecture patterns
✓ Scalability concepts
✓ Database design
✓ Caching strategies
✓ Load balancing
✓ Distributed systems
```

**Problem-Solving** (30%):
```
✓ Breaking down complex problems
✓ Identifying bottlenecks
✓ Proposing solutions
✓ Handling constraints
```

**Communication** (40%):
```
✓ Asking clarifying questions
✓ Explaining design decisions
✓ Discussing tradeoffs
✓ Receptiveness to feedback
✓ Whiteboarding clearly
```

## The RESEDA Framework

### R - Requirements Clarification

**Functional Requirements** (What the system does):
```
Problem: "Design Instagram"

Ask about:

Core Features:
"Should users be able to:
 - Upload photos? ✓
 - Upload videos? (clarify)
 - Follow other users? ✓
 - Like and comment? ✓
 - Have a feed? ✓
 - Search? (clarify)
 - Direct messaging? (out of scope for now)"

Priority:
"Which features are most critical?"
→ Interviewer: "Focus on uploading photos and the feed"
```

**Non-Functional Requirements** (How the system performs):
```
Ask about:

Scale:
"How many users?"
→ "Let's design for 500M users"

"How many photos uploaded daily?"
→ "100M photos per day"

Performance:
"What's the expected latency?"
→ "Feed should load in < 2 seconds"

"Is consistency critical?"
→ "Eventual consistency is acceptable"

Availability:
"What's the uptime requirement?"
→ "99.9% availability"
```

**Template Questions**:
```
Scale:
- How many users?
- How many requests per second?
- How much data?
- Growth rate?

Performance:
- Latency requirements?
- Throughput requirements?
- Consistency vs availability?

Special Constraints:
- Geographic distribution?
- Mobile/web/both?
- Budget constraints?
```

### E - Estimation (Back-of-the-Envelope)

**Calculate Scale**:
```
Problem: Instagram with 500M users

Active Users:
- Daily active users (DAU): 500M * 0.2 = 100M
- Users uploading: 100M * 0.1 = 10M
- Photos per user per day: 2
- Total uploads: 10M * 2 = 20M photos/day

Storage:
- Average photo size: 2MB
- Daily storage: 20M * 2MB = 40TB/day
- Annual storage: 40TB * 365 = 14.6PB/year

Bandwidth:
- Upload: 20M photos/day / 86400 seconds = 231 photos/sec
- Upload bandwidth: 231 * 2MB = 462 MB/s
- Read:Write ratio ~ 100:1 (typical for social media)
- Download bandwidth: 462 MB/s * 100 = 46.2 GB/s

Database:
- Users: 500M * 1KB (metadata) = 500GB
- Photos metadata: assume 5 years
  - 20M photos/day * 365 * 5 * 1KB = 36.5TB
```

**Communication Template**:
```
"Let me estimate the scale we're dealing with...

[Write numbers on whiteboard]

Daily Active Users: 100M
Photos uploaded/day: 20M
Storage/day: 40TB
Bandwidth: ~50GB/s for reads

So we're looking at a high-traffic, write-heavy system 
with significant storage requirements. Does this match 
your expectations?"
```

### S - System Interface (API Design)

**Define Core APIs**:
```
Problem: Instagram

API 1: Upload Photo
POST /api/v1/photos
Request:
{
  "image": binary_data,
  "caption": "string",
  "location": "string",
  "user_id": "string"
}
Response:
{
  "photo_id": "string",
  "url": "string",
  "timestamp": "datetime"
}

API 2: Get Feed
GET /api/v1/feed
Parameters:
  user_id: string
  page_size: int (default 20)
  cursor: string (pagination)
Response:
{
  "photos": [
    {
      "photo_id": "string",
      "url": "string",
      "author": "string",
      "likes": int,
      "timestamp": "datetime"
    }
  ],
  "next_cursor": "string"
}

API 3: Follow User
POST /api/v1/follow
Request:
{
  "user_id": "string",
  "target_user_id": "string"
}
```

**Communication**:
```
"Let me define the key APIs we'll need:

[Draw on whiteboard]

For uploading photos, we'll need an endpoint that accepts 
the image data and metadata...

For the feed, we'll use pagination with cursors rather 
than offset-based pagination because it's more efficient 
for large datasets and handles real-time updates better.

Does this API structure make sense?"
```

### E - Design Core Components

**High-Level Architecture**:
```
[Clients] → [Load Balancer] → [API Gateway]
                                     ↓
              ┌──────────────────────┼──────────────────────┐
              ↓                      ↓                      ↓
         [Upload      [Feed        [User
          Service]     Service]     Service]
              ↓          ↓            ↓
         [Object    [Cache]      [User DB]
          Storage]       ↓
              ↓     [Photo DB]
              ↓
         [CDN]
```

**Component Descriptions**:
```
You: "Let me start with the high-level components:

1. Load Balancer:
   - Distributes traffic across API servers
   - Health checks for failing servers

2. API Gateway:
   - Authentication/authorization
   - Rate limiting
   - Request routing

3. Upload Service:
   - Handles photo uploads
   - Validates and processes images
   - Stores in object storage (S3)
   - Writes metadata to database

4. Feed Service:
   - Generates user feeds
   - Pulls from cache when possible
   - Fan-out on write for important users

5. Object Storage (S3):
   - Stores actual image files
   - Backed by CDN for fast delivery

6. Databases:
   - Photo DB: Photo metadata (SQL or NoSQL)
   - User DB: User profiles and relationships

7. Cache (Redis):
   - Feed cache
   - User data cache
   - Hot photo metadata

8. CDN:
   - Caches images geographically
   - Reduces latency
   - Reduces bandwidth costs

Does this high-level structure make sense? Should I dive 
deeper into any particular component?"
```

### D - Deep Dive

**Pick Components to Explore**:
```
Interviewer might say:
"Let's talk about how you'd generate the feed."

You: "Great! The feed is one of the most challenging parts.

There are two main approaches:

1. Fan-out on Write (Push):
   - When user posts, immediately push to all followers' feeds
   - Pre-compute feeds in advance
   
   Pros:
   + Fast read (feed is pre-computed)
   + Consistent user experience
   
   Cons:
   - Expensive for users with many followers
   - Wasted work if follower doesn't check feed
   - Duplicate storage

2. Fan-out on Read (Pull):
   - When user requests feed, query recent posts from followed users
   - Compute feed on demand
   
   Pros:
   + No wasted work
   + Less storage
   + Works for any number of followers
   
   Cons:
   - Slower reads
   - Expensive queries
   - Hotspotting

Hybrid Approach (Recommended):
- Fan-out on write for most users (< 1M followers)
- Fan-out on read for celebrities (> 1M followers)
- Cache aggressively

Would you like me to detail the implementation?"
```

**Database Schema**:
```
You: "Let me design the database schema:

Users Table:
- user_id (PK)
- username
- email
- profile_pic_url
- created_at

Photos Table:
- photo_id (PK)
- user_id (FK)
- image_url
- caption
- location
- created_at

Follows Table:
- follower_id (FK)
- followee_id (FK)
- created_at
- PRIMARY KEY (follower_id, followee_id)

Feeds Table (Cache):
- user_id (PK)
- photo_ids (list)
- last_updated

For the Photos table, I'd partition by user_id or created_at 
depending on access patterns. We can discuss sharding strategy 
if you'd like."
```

### A - Address Bottlenecks

**Identify Issues**:
```
You: "Let me think about potential bottlenecks:

1. Database:
   - With 500M users and billions of photos, single DB won't work
   - Solution: Sharding
     - Shard by user_id for user data
     - Shard by photo_id for photo data
     - Use consistent hashing

2. Object Storage:
   - 40TB/day is manageable with S3
   - But retrieving from S3 every time is slow
   - Solution: CDN caching
     - Popular photos cached at edge
     - 80/20 rule: 20% of photos = 80% of traffic

3. Feed Generation:
   - Generating feeds for 100M users is expensive
   - Solution: Pre-compute and cache
     - Redis cache with LRU eviction
     - TTL of 5 minutes for active users
     - Lazy loading for inactive users

4. Single Point of Failure:
   - Any single component could fail
   - Solution: Redundancy
     - Multiple load balancers
     - Database replication
     - Multi-region deployment

5. Hotspotting:
   - Celebrity posts cause traffic spikes
   - Solution: 
     - Rate limiting
     - Separate queues for high-traffic events
     - Probabilistic sampling for view counts"
```

## Common System Design Patterns

### Caching Strategy

**Cache Layers**:
```
Client → CDN → Application Cache → Database

You: "I'd implement multi-level caching:

Level 1: Browser Cache
- Cache-Control headers
- ETags for validation

Level 2: CDN (CloudFlare/Akamai)
- Cache images globally
- 90% of image requests served from edge

Level 3: Application Cache (Redis)
- User feeds
- Hot photo metadata
- User sessions
- TTL: 5-10 minutes

Cache Invalidation:
- When user posts: invalidate followers' feeds
- When user updates profile: invalidate user cache
- Use pub/sub for cache invalidation across servers"
```

**Cache Patterns**:
```
1. Cache-Aside (Lazy Loading):
   - Check cache first
   - If miss, load from DB and populate cache
   - Application manages cache

2. Write-Through:
   - Write to cache and DB simultaneously
   - Guarantees consistency
   - Slower writes

3. Write-Behind:
   - Write to cache immediately
   - Asynchronously write to DB
   - Faster writes, risk of data loss

For Instagram, I'd use:
- Cache-aside for reads (feeds, profiles)
- Write-through for critical data (photos metadata)
```

### Database Scaling

**Vertical vs Horizontal**:
```
You: "For scaling the database:

Vertical Scaling (Scale Up):
- Increase CPU, RAM, disk
- Simple, no code changes
- Limited by hardware
- Single point of failure

Horizontal Scaling (Scale Out):
- Add more database servers
- Handle more load
- More complex
- Better fault tolerance

For this system, we need horizontal scaling.
```

**Sharding Strategies**:
```
1. Shard by User ID:
   user_id → hash(user_id) % num_shards → shard_n
   
   Pros:
   + User data co-located
   + Simple queries
   
   Cons:
   - Hot shards (popular users)
   - Difficult to rebalance

2. Shard by Photo ID:
   photo_id → hash(photo_id) % num_shards → shard_n
   
   Pros:
   + Evenly distributed
   + No hot shards
   
   Cons:
   - Cross-shard queries for feeds
   - More complex

3. Consistent Hashing:
   - Virtual nodes on hash ring
   - Minimal data movement when adding/removing servers
   
   I'd recommend consistent hashing with replication 
   factor of 3 for fault tolerance."
```

### Load Balancing

**Algorithms**:
```
You: "For load balancing:

1. Round Robin:
   - Requests distributed equally
   - Simple
   - Doesn't account for server load

2. Least Connections:
   - Send to server with fewest active connections
   - Better for varying request durations

3. Weighted:
   - Assign weights based on server capacity
   - Good for heterogeneous servers

4. Consistent Hashing:
   - Maps requests to servers deterministically
   - Minimal disruption when adding/removing servers

For stateless API servers: Least Connections
For caching servers: Consistent Hashing"
```

### Message Queues

**When to Use**:
```
You: "I'd add message queues for asynchronous processing:

Use Cases:
1. Photo Processing:
   - Original upload → Queue → Workers
   - Generate thumbnails
   - Apply filters
   - Extract metadata

2. Feed Fan-out:
   - New post → Queue → Workers
   - Update followers' feeds
   - Send notifications

3. Analytics:
   - User actions → Queue → Analytics pipeline
   - Non-blocking
   - Can retry on failure

Technology: Kafka or RabbitMQ
- Kafka: High throughput, event streaming
- RabbitMQ: Complex routing, guaranteed delivery

For this system, I'd choose Kafka because we prioritize 
throughput over delivery guarantees."
```

## Communication Strategies

### Discussing Tradeoffs

**Template**:
```
"I'm considering [Option A] vs [Option B].

Option A:
Advantages: [list]
Disadvantages: [list]
Best when: [scenario]

Option B:
Advantages: [list]
Disadvantages: [list]
Best when: [scenario]

For this problem, I'd choose [X] because [reason], 
but I acknowledge that [tradeoff].

Does that align with your expectations?"
```

**Example**:
```
"For the database, I'm considering SQL vs NoSQL.

SQL (PostgreSQL):
+ ACID guarantees
+ Complex queries (JOINs)
+ Mature ecosystem
- Harder to scale horizontally
- Schema changes require migrations

NoSQL (Cassandra):
+ Easy horizontal scaling
+ High write throughput
+ Flexible schema
- Eventual consistency
- Limited query capabilities
- Learning curve

For Instagram, I'd use:
- SQL for user data (consistency matters, limited scale)
- NoSQL for photo metadata (massive scale, eventual consistency OK)

This hybrid approach optimizes for each data type's requirements. 
What do you think?"
```

### Asking for Guidance

**When Unsure**:
```
✓ "I'm not deeply familiar with [X]. Would you like me 
   to explain my high-level understanding, or should we 
   focus on other aspects?"

✓ "I can think of multiple approaches here. Would you 
   prefer I explore [A] or [B] first?"

✓ "Before I dive deeper, is this the right direction?"

✓ "I'd need to research the specifics of [X], but my 
   understanding is [Y]. Does that sound right?"
```

### Showing Depth

**Go Beyond Surface**:
```
Not just: "We'll use a cache."

Better: "We'll use Redis for caching. Specifically:
- Cache feeds with 5-minute TTL
- LRU eviction policy
- Replicate cache across regions
- Use Redis Cluster for horizontal scaling
- Cache hot photos with longer TTL
- Monitor cache hit rate (target 80%+)

For cache invalidation, we'll use a pub/sub pattern 
where updates publish to a channel, and all cache 
nodes subscribe to invalidate their local caches."
```

## Common System Design Questions

### Easy/Medium

**URL Shortener**:
```
Key Points:
- Hash function for short URLs
- Database for mappings
- Cache for hot URLs
- Analytics tracking
- Custom short URLs
```

**Pastebin**:
```
Key Points:
- Object storage for pastes
- Database for metadata
- Expiration handling
- Syntax highlighting
- Rate limiting
```

**Web Crawler**:
```
Key Points:
- URL frontier (queue)
- Duplicate detection (Bloom filter)
- Politeness policy (robots.txt)
- Distributed crawling
- Storage and indexing
```

### Medium/Hard

**Instagram/Twitter/Facebook**:
```
Key Points:
- Feed generation (fan-out)
- Sharding strategy
- Caching layers
- CDN for media
- Notifications
- Search functionality
```

**Netflix/YouTube**:
```
Key Points:
- Video encoding (multiple qualities)
- CDN and streaming
- Recommendation system
- Thumbnail generation
- View count aggregation
```

**Uber/Lyft**:
```
Key Points:
- Geospatial indexing (QuadTree/Geohash)
- Real-time location tracking
- Matching algorithm
- ETA calculation
- Surge pricing
```

**Messenger/WhatsApp**:
```
Key Points:
- WebSocket connections
- Message queue
- Delivery receipts
- Offline message storage
- Group chats
- Media handling
```

### Hard

**Google Search**:
```
Key Points:
- Web crawling at scale
- Inverted index
- Ranking algorithm
- Distributed processing (MapReduce)
- Auto-complete (Trie)
- Query understanding
```

**Distributed Cache**:
```
Key Points:
- Consistent hashing
- Replication strategy
- Eviction policies
- Cache coherence
- Monitoring
```

## Whiteboarding Tips

### Drawing Clear Diagrams

**Use Consistent Symbols**:
```
[Rectangle] = Service/Server
[Cylinder] = Database
[Circle] = External Service
[Arrow] = Data Flow
[Cloud] = Object Storage/CDN
[Diamond] = Decision Point
```

**Progressive Detail**:
```
Start simple:
[Client] → [Server] → [Database]

Add layers:
[Client] → [Load Balancer] → [API Server] → [Database]

Add components:
[Client] → [Load Balancer] → [API Server] → [Cache]
                                  ↓
                             [Database]

Keep it readable—don't overcrowd!
```

### Organizing the Whiteboard

**Layout**:
```
Top: High-Level Architecture
Middle: Detailed Components
Bottom: Database Schema / Calculations

Leave space for notes and modifications!
```

## Time Management

### 45-Minute Interview

```
Requirements (10 min):
- Functional requirements
- Non-functional requirements
- Scale estimation

High-Level Design (15 min):
- Draw architecture
- Explain components
- Discuss data flow

Deep Dive (15 min):
- Detailed component design
- Database schema
- Bottleneck discussion

Wrap-Up (5 min):
- Tradeoffs summary
- Your questions
```

### 60-Minute Interview

```
Add more time for:
- More detailed estimation (10 min)
- Multiple deep dives (20 min)
- Alternative approaches (5 min)
```

## Practice Strategy

### Week 1-2: Fundamentals

```
Study:
- CAP theorem
- Load balancing
- Caching
- Database scaling
- Consistent hashing

Practice:
- Design simple systems
- URL shortener
- Pastebin
```

### Week 3-4: Common Patterns

```
Study:
- System design patterns
- Read engineering blogs
- Study real systems

Practice:
- Social media (Instagram/Twitter)
- Content platforms (YouTube/Netflix)
```

### Week 5-6: Mock Interviews

```
- Practice with peers
- Record sessions
- Get feedback
- Refine communication
```

## Resources

**Books**:
- "Designing Data-Intensive Applications" - Martin Kleppmann
- "System Design Interview" - Alex Xu

**Websites**:
- GitHub: system-design-primer
- High Scalability blog
- Company engineering blogs (Netflix, Uber, Airbnb)

**Courses**:
- Grokking the System Design Interview
- System Design Masterclass

## Next Steps

Explore related topics:
- [Coding Interviews](/developer-interviews/coding-interviews)
- [Behavioral Interviews](/developer-interviews/behavioral-interviews)
- [Interview Communication](/developer-interviews/interview-communication)
- [Developer Interview Preparation](/developer-interviews)

Remember: System design interviews are conversations, not exams. There's no single right answer. Show your thinking, discuss tradeoffs, and collaborate with the interviewer. They want to see how you'd work with their team to solve real problems.
