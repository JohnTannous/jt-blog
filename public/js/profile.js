const newFormHandler = async (event) => {
  event.preventDefault();

  const name = document.querySelector('#article-name').value.trim();
  
  const description = document.querySelector('#article-desc').value.trim();

  const story = document.querySelector('#article-story').value.trim();

  if (name && description && story) {
    const response = await fetch(`/api/articles`, {
      method: 'POST',
      body: JSON.stringify({ name, description, story }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      document.location.replace('/profile');
    } else {
      alert('Failed to create article');
    }
  }
};

const delButtonHandler = async (event) => {
  if (event.target.hasAttribute('data-id')) {
    const id = event.target.getAttribute('data-id');

    const response = await fetch(`/api/articles/${id}`, {
      method: 'DELETE',
    });

    if (response.ok) {
      document.location.replace('/profile');
    } else {
      alert('Failed to delete article');
    }
  }
};

document
  .querySelector('.new-article-form')
  .addEventListener('submit', newFormHandler);

document
  .querySelector('.article-list')
  .addEventListener('click', delButtonHandler);
