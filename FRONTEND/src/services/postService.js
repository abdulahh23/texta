const API_BASE_URL = 'http://localhost:8000';

export const fallbackPosts = [
  {
    id: 1,
    username: 'Abdullah',
    title: 'Why I started learning React',
    content:
      'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Aperiam et, odio, accusamus quod quidem ut perferendis saepe ipsam dolorum sint aspernatur consectetur in, a ullam necessitatibus nihil incidunt aliquid suscipit?',
    summary:
      'A practical reflection on starting with React and the value of learning by building real UI patterns.',
    userId: 1,
  },
  {
    id: 2,
    username: 'Samira',
    title: 'Small thinking habits that changed my workflow',
    content:
      'I started shortening my tasks and journaling my ideas every day. The result has been calmer work and clearer decisions when I feel overwhelmed.',
    summary:
      'Simple habits like journaling and reducing task scope make a meaningful difference in focus and clarity.',
    userId: 2,
  },
];

const toSafeString = (...values) => {
  for (const value of values) {
    if (typeof value === 'string') {
      const trimmed = value.trim();
      if (trimmed) {
        return trimmed;
      }
    }
  }

  return '';
};

const createFallbackSummary = (text) => {
  const sentence = toSafeString(text, 'A thoughtful post worth reading.');
  return sentence.length > 110 ? `${sentence.slice(0, 107).trim()}...` : sentence;
};

const normalizePost = (post, fallbackLabel = 'You') => {
  const title = toSafeString(post?.title, 'Untitled post');
  const content = toSafeString(post?.content, post?.body, 'No content available.');
  const username = toSafeString(post?.username, post?.author, fallbackLabel);
  const summary = toSafeString(post?.summary, post?.ai_summary, createFallbackSummary(content));

  return {
    id: post?.id ?? post?.post_id ?? Date.now() + Math.random(),
    title,
    content,
    summary,
    username,
    userId: post?.userId ?? post?.user_id ?? 1,
    createdAt: post?.createdAt ?? new Date().toISOString(),
  };
};

export const fetchPosts = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/posts/get_random_posts`);
    if (!response.ok) {
      throw new Error('Unable to fetch posts');
    }

    const payload = await response.json();
    const postList = Array.isArray(payload) ? payload : payload?.data ?? [];

    return postList.map((post) => normalizePost(post, 'Abdullah'));
  } catch {
    return fallbackPosts;
  }
};

export const createPost = async ({ title, content, username = 'You', userId = 1 }) => {
  try {
    const response = await fetch(`${API_BASE_URL}/posts/create_new_post?user_id=${userId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title,
        content,
        published: true,
      }),
    });

    if (!response.ok) {
      throw new Error('Create post request failed');
    }

    const payload = await response.json();
    const data = payload?.data ?? payload;

    return normalizePost({
      ...data,
      title: data?.title ?? title,
      content: data?.content ?? content,
      username: data?.username ?? username,
      userId: data?.userId ?? data?.user_id ?? userId,
    }, username);
  } catch {
    return {
      id: Date.now(),
      title,
      content,
      username,
      userId,
      summary: 'A thoughtful post created and ready to share with the community.',
      createdAt: new Date().toISOString(),
    };
  }
};

export const requestGrammarFix = async (text) => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/ai/grammar-fix`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ text }),
    });

    if (!response.ok) {
      throw new Error('Grammar service unavailable');
    }

    const payload = await response.json();
    const correctedText = toSafeString(
      payload?.corrected_text,
      payload?.correctedText,
      payload?.text,
      text
    );

    return {
      correctedText,
      isFallback: false,
    };
  } catch {
    const cleaned = text.replace(/\s+/g, ' ').trim();
    const correctedText = cleaned
      ? cleaned.charAt(0).toUpperCase() + cleaned.slice(1)
      : text;

    return {
      correctedText: correctedText.endsWith('.') || correctedText.endsWith('!') || correctedText.endsWith('?')
        ? correctedText
        : `${correctedText}.`,
      isFallback: true,
    };
  }
};
