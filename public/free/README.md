```sql
CREATE TABLE prospects (
    id INTEGER NOT NULL DEFAULT nextval('prospects_id_seq'::regclass),
    first_name TEXT,
    last_name TEXT,
    title TEXT,
    company TEXT,
    email TEXT,
    email_status TEXT,
    source TEXT,
    sell_by_date TEXT,
    seniority TEXT,
    department TEXT,
    phone TEXT,
    lists TEXT,
    linkedin TEXT,
    country TEXT,
    search_vector TSVECTOR,
    flag BOOLEAN DEFAULT false,
    hide BOOLEAN DEFAULT false,
    name TEXT
);
```

monkey
image: https://live.staticflickr.com/65535/55196635250_f69fd14b3f_c.jpg

