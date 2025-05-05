let reviews = [];
let replyIdCounter = 1;

const submitBtn = document.getElementById('submitReview');
const reviewInput = document.getElementById('reviewInput');
const reviewsContainer = document.getElementById('reviewsContainer');

submitBtn.addEventListener('click', () => {
  const text = reviewInput.value.trim();
  if (text !== '') {
    const review = {
      id: Date.now(),
      text,
      likes: 0,
      dislikes: 0,
      replies: [],
    };
    reviews.unshift(review);
    renderReviews();
    reviewInput.value = '';
  }
});

function renderReviews() {
  reviewsContainer.innerHTML = '';
  reviews.forEach((review) => {
    const div = document.createElement('div');
    div.className = 'review';

    div.innerHTML = `
      <p>${review.text}</p>
      <button onclick="likeReview(${review.id})">👍 ${review.likes}</button>
      <button onclick="dislikeReview(${review.id})">👎 ${review.dislikes}</button>
      <button onclick="toggleReplyInput(${review.id})">💬 Reply</button>

      <div id="reply-input-${review.id}" style="display:none; margin-top: 5px;">
        <input type="text" id="reply-text-${review.id}" placeholder="Write a reply..." />
        <button onclick="addReply(${review.id})">Post Reply</button>
      </div>



      <div class="replies" id="replies-${review.id}">
        ${review.replies.map(reply => `
          <div class="reply" style="margin-left: 20px;">
            ↳ ${reply.text}
            <button onclick="likeReply(${review.id}, ${reply.id})">👍 ${reply.likes}</button>
            <button onclick="dislikeReply(${review.id}, ${reply.id})">👎 ${reply.dislikes}</button>
          </div>
        `).join('')}
      </div>
    `;

    reviewsContainer.appendChild(div);
  });
}

function likeReview(id) {
  reviews = reviews.map((review) =>
    review.id === id ? { ...review, likes: review.likes + 1 } : review
  );
  renderReviews();
}

function dislikeReview(id) {
  reviews = reviews.map((review) =>
    review.id === id ? { ...review, dislikes: review.dislikes + 1 } : review
  );
  renderReviews();
}

function toggleReplyInput(id) {
  const box = document.getElementById(`reply-input-${id}`);
  box.style.display = box.style.display === 'none' ? 'block' : 'none';
}

function addReply(reviewId) {
  const input = document.getElementById(`reply-text-${reviewId}`);
  const text = input.value.trim();
  if (text !== '') {
    reviews = reviews.map((review) => {
      if (review.id === reviewId) {
        const newReply = {
          id: replyIdCounter++,
          text,
          likes: 0,
          dislikes: 0
        };
        return {
          ...review,
          replies: [...review.replies, newReply]
        };
      }
      return review;
    });
    renderReviews();
  }
}

function likeReply(reviewId, replyId) {
  reviews = reviews.map((review) => {
    if (review.id === reviewId) {
      const updatedReplies = review.replies.map((reply) =>
        reply.id === replyId ? { ...reply, likes: reply.likes + 1 } : reply
      );
      return { ...review, replies: updatedReplies };
    }
    return review;
  });
  renderReviews();
}

function dislikeReply(reviewId, replyId) {
  reviews = reviews.map((review) => {
    if (review.id === reviewId) {
      const updatedReplies = review.replies.map((reply) =>
        reply.id === replyId ? { ...reply, dislikes: reply.dislikes + 1 } : reply
      );
      return { ...review, replies: updatedReplies };
    }
    return review;
  });
  renderReviews();
}
