import { useState } from 'react'
import { Trash2, ThumbsUp } from 'lucide-react'
import './Feed.css'

const initialPosts = [
  {
    id: 1,
    author: {
      name: 'Jane Cooper',
      role: 'Dev Front-End',
      avatar: 'https://randomuser.me/api/portraits/women/68.jpg',
    },
    time: 'Cerca de 1h',
    content: [
      { type: 'paragraph', text: 'Fala galera 👋' },
      { type: 'paragraph', text: 'Acabei de subir mais um projeto no meu portifa. É um projeto que fiz no NLW Return, evento da Rocketseat. O nome do projeto é DoctorCare 🚀' },
      { type: 'link', text: 'jane.design/doctorcare' },
      { type: 'hashtags', tags: ['#novoprojeto', '#nlw', '#rocketseat'] },
    ],
    comments: [],
  },
  {
    id: 2,
    author: {
      name: 'Devon Lane',
      role: 'Dev Front-End',
      avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
    },
    time: 'Cerca de 2h',
    content: [
      { type: 'paragraph', text: 'Fala pessoal 👋' },
      { type: 'paragraph', text: 'Finalmente finalizei meu novo site/portfólio. Foi um baita desafio criar todo o design e codar na unha, mas consegui 💪' },
      { type: 'link', text: 'devonlane.design' },
      { type: 'hashtags', tags: ['#uiux', '#userexperience'] },
    ],
    comments: [],
  },
]

const user = {
  name: 'Você',
  avatar: 'https://randomuser.me/api/portraits/men/99.jpg',
}

function getCurrentTimeString() {
  return 'Agora';
}

export default function Feed() {
  const [posts, setPosts] = useState(initialPosts)
  const [commentInputs, setCommentInputs] = useState({})
  const [modal, setModal] = useState({ open: false, postId: null, commentId: null })

  const handleInputChange = (postId, value) => {
    setCommentInputs(inputs => ({ ...inputs, [postId]: value }))
  }

  const handleCommentSubmit = (e, postId) => {
    e.preventDefault()
    const comment = commentInputs[postId]?.trim()
    if (!comment) return
    setPosts(posts => posts.map(post =>
      post.id === postId
        ? {
            ...post,
            comments: [
              ...post.comments,
              {
                id: Date.now() + Math.random(),
                author: user.name,
                avatar: user.avatar,
                time: getCurrentTimeString(),
                text: comment,
                likes: 0,
              },
            ],
          }
        : post
    ))
    setCommentInputs(inputs => ({ ...inputs, [postId]: '' }))
  }

  const handleLikeComment = (postId, commentId) => {
    setPosts(posts => posts.map(post =>
      post.id === postId
        ? {
            ...post,
            comments: post.comments.map(comment =>
              comment.id === commentId
                ? { ...comment, likes: comment.likes + 1 }
                : comment
            ),
          }
        : post
    ))
  }

  const openDeleteModal = (postId, commentId) => {
    setModal({ open: true, postId, commentId })
  }

  const closeModal = () => {
    setModal({ open: false, postId: null, commentId: null })
  }

  const handleDeleteComment = () => {
    setPosts(posts => posts.map(post =>
      post.id === modal.postId
        ? {
            ...post,
            comments: post.comments.filter(comment => comment.id !== modal.commentId)
          }
        : post
    ))
    closeModal()
  }

  // ESC para fechar modal
  if (modal.open) {
    window.onkeydown = (e) => {
      if (e.key === 'Escape') closeModal()
    }
  } else {
    window.onkeydown = null
  }

  return (
    <div className="feed">
      {posts.map(post => (
        <div className="post" key={post.id}>
          <div className="post-header">
            <img className="post-avatar" src={post.author.avatar} alt={post.author.name} />
            <div>
              <strong>{post.author.name}</strong>
              <span>{post.author.role}</span>
              <time>{post.time}</time>
            </div>
          </div>
          <div className="post-content">
            {post.content.map((block, idx) => {
              if (block.type === 'paragraph') return <p key={idx}>{block.text}</p>
              if (block.type === 'link') return <a key={idx} href="#">{block.text}</a>
              if (block.type === 'hashtags') return (
                <div className="hashtags" key={idx}>
                  {block.tags.map(tag => <span key={tag}>{tag}</span>)}
                </div>
              )
              return null
            })}
          </div>
          <form className="comment-form" onSubmit={e => handleCommentSubmit(e, post.id)}>
            <strong>Deixe seu feedback</strong>
            <textarea
              placeholder="Escreva um comentário..."
              value={commentInputs[post.id] || ''}
              onChange={e => handleInputChange(post.id, e.target.value)}
            />
            <button type="submit">Publicar</button>
          </form>
          {post.comments.length > 0 && (
            <div className="comments-list">
              {post.comments.map((comment) => (
                <div className="comment-card" key={comment.id}>
                  <img className="comment-avatar" src={comment.avatar} alt={comment.author} />
                  <div className="comment-content">
                    <div className="comment-header">
                      <span className="comment-author">{comment.author}</span>
                      <span className="comment-time">{comment.time}</span>
                      <button className="comment-delete-btn" title="Deletar" onClick={() => openDeleteModal(post.id, comment.id)}>
                        <Trash2 size={20} stroke="#a1a1aa" strokeWidth={2} />
                      </button>
                    </div>
                    <div className="comment-text">{comment.text}</div>
                    <button className="comment-like-btn" onClick={() => handleLikeComment(post.id, comment.id)}>
                      <ThumbsUp size={20} stroke="#a1a1aa" strokeWidth={2} />
                      <span>Aplaudir • {String(comment.likes).padStart(2, '0')}</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
      {modal.open && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal" onClick={e => e.stopPropagation()}>
            <h2>Excluir comentário</h2>
            <p>Você tem certeza que gostaria de excluir este comentário?</p>
            <div className="modal-actions">
              <button className="modal-cancel" onClick={closeModal}>Cancelar</button>
              <button className="modal-delete" onClick={handleDeleteComment}>Sim, excluir</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
} 