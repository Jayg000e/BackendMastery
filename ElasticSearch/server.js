const express = require('express');
const { Client } = require('@elastic/elasticsearch');
const app = express();
const client = new Client({ node: 'http://localhost:9200' });

app.use(express.json()); 

const port = 3000;

// Function to create a new blog post
async function createBlogPost(post) {
    try {
      await client.index({
        index: 'blog_posts',
        body: post
      });
      console.log('Blog post created:', post);
    } catch (error) {
      console.error('Error creating blog post:', error);
    }
  }
  
// Function for full-text search in blog posts
async function searchBlogPosts(query) {
    try {
        const  body  = await client.search({
        index: 'blog_posts',
        body: {
            query: {
            multi_match: {
                query: query,
                fields: ['title', 'content']
            }
            }
        }
        });

        console.log('Search results:', body.hits.hits);
        return body.hits.hits;
    } catch (error) {
        console.error('Error searching blog posts:', error);
    }
}

// Function for filtering posts by category
async function filterPostsByCategory(category) {
    try {
        const body = await client.search({
        index: 'blog_posts',
        body: {
            query: {
            term: { categories: category }
            }
        }
        });

        console.log('Filtered results:', body.hits.hits);
        return body.hits.hits;
    } catch (error) {
        console.error('Error filtering posts by category:', error);
    }
}

// Function for searching posts by date range
async function searchPostsByDateRange(startDate, endDate) {
    try {
        const body = await client.search({
        index: 'blog_posts',
        body: {
            query: {
            range: {
                date_published: {
                gte: startDate,
                lte: endDate
                }
            }
            }
        }
        });

        console.log('Date range search results:', body.hits.hits);
        return body.hits.hits;
    } catch (error) {
        console.error('Error searching posts by date range:', error);
    }
}
// Endpoint to create a new blog post
app.post('/blog-posts', async (req, res) => {
  try {
    await createBlogPost(req.body);
    res.status(201).send('Blog post created successfully');
  } catch (error) {
    res.status(500).send('Error creating blog post');
  }
});

// Endpoint for full-text search in blog posts
app.get('/search', async (req, res) => {
  try {
    const query = req.query.q;
    const results = await searchBlogPosts(query);
    res.status(200).json(results);
  } catch (error) {
    res.status(500).send('Error searching blog posts');
  }
});

// Endpoint for filtering posts by category
app.get('/posts/category', async (req, res) => {
  try {
    const category = req.query.category;
    const results = await filterPostsByCategory(category);
    res.status(200).json(results);
  } catch (error) {
    res.status(500).send('Error filtering posts by category');
  }
});

// Endpoint for searching posts by date range
app.get('/posts/date-range', async (req, res) => {
  try {
    const { start, end } = req.query;
    const results = await searchPostsByDateRange(start, end);
    res.status(200).json(results);
  } catch (error) {
    res.status(500).send('Error searching posts by date range');
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

