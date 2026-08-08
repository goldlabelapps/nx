<div>
    <h1 style="display: flex; align-items: center; gap: 4px;">
        <a href="https://goldlabel.pro" target="_blank" rel="noreferrer" style="display: inline-flex; align-items: center;">
        <img
            src="https://goldlabel.pro/favicons/favicon_dark.png"
            width="32"
            height="32"
        />
        </a>
        <span>NX° tsvector</span>
    </h1>
</div>

Superfast full text search

> Tags: docs, concepts, experience, techstack, python, tsvector

> [CleverText text="Superfast search with tsvector"]  

PostgreSQL provides two data types that are designed to support full text search, which is the activity of searching through a collection of natural-language documents to locate those that best match a query. The tsvector type represents a document in a form optimized for text search; the tsquery type similarly represents a text query.

What makes tsvector brilliant is its ability to turn messy, unstructured text into a lightning-fast, searchable format right inside your database. With tsvector, you get powerful, language-aware search capabilities—ranking, stemming, and relevance without leaving Postgres. It’s great for building search features that feel instant and smart.


### Full-Text Search

The prospects table includes a **search_vector** column computed from all text fields on insert/update. A GIN index enables fast, scalable full-text search:

```sql
SELECT * FROM prospects WHERE 
    search_vector @@ plainto_tsquery(
        'english', 'search terms'
    );
```

**How it works:**
- On every insert/update, `search_vector` is computed using PostgreSQL's `to_tsvector('english', ...)`.
- The GIN index (`idx_prospects_search_vector`) enables efficient search across large datasets.
