import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Blog_item.css';
import image_1 from '../../../../assets/img/practical_lab2/image_1.png';
import icon from '../../../../assets/img/practical_lab2/icon.png';
import Footer from '../../../../../components/Footer/Footer';
import GoBackBtn from '../../../../../components/GoBack_Btn/GoBack_Btn';
import ShowHint from '../../../../../components/ShowHint_Btn/ShowHint_Btn';
import ThemeSwitcher from '../../../../../components/ThemeSwitcher/ThemeSwitcher';

export default function BlogItem() {
  const [resetmessage, setResetMessage] = useState('');
  const [form, setForm] = useState({ name: '', content: '' });
  const [comments, setComments] = useState([]);
  const [err, setErr] = useState('');
  const [loading, setLoading] = useState(false);
  const [html, setHtml] = useState('');
  const hintMessage = `
    <div style={{ textAlign: "left", fontSize: "1rem", lineHeight: "1.5", color: "#333" }}>
      <p>Enter the following into the comment box:</p>
      <code style={{ display: "block", background: "#f8f9fa", padding: "10px", borderRadius: "5px", color: "#d63384" }}>
        &lt;script&gt;alert(1)&lt;/script&gt;
      </code>
      <p>Enter a name, name, and website.</p>
      <p>Click "Post comment".</p>
      <p>Go back to the blog.</p>
    </div>
  `;
  const handleSubmit = async (e) => {
    e.preventDefault();
    const comment = e.target.content.value;
    const name = e.target.name.value;
    setLoading(true);
    try {
      const response = await axios.post(
        'https://digitopia-project-backend.vercel.app/api/SSTI1Comments',
        {
          comment,
          name,
        }
      );
      console.log(response);
      if (response.status === 200) {
        setHtml(response.data);
      } else {
        setHtml('');
      }
      const newComment = {
        id: Date.now(),
        name: response.data.name,
        content: response.data.content,
      };
      setComments((prevComments) => [...prevComments, newComment]);
      setErr('');
      fetchComments();
    } catch (err) {
      setErr('Failed to submit the comment');
      console.error('Error submitting comment:', err);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    setForm({ name: '', content: '' });
  }, [comments]);

  async function fetchComments() {
    try {
      const response = await axios.get(
        'https://digitopia-project-backend.vercel.app/api/SSTI1Comments'
      );

      if (Array.isArray(response.data)) {
        setComments(
          response.data.map((cmt) => ({
            id: cmt.id, // Use the id from the response
            name: cmt.name, // Use the name from the response
            content: cmt.comment, // Map the comment to content
          }))
        );
      } else {
        setComments([]); // In case the response is not an array
      }
    } catch (error) {
      setErr('Failed to fetch comments.');
      console.error('Error fetching comments:', error);
      setComments([]); // Set comments to an empty array in case of error
    }
    console.log(); // Check if the comments are in the expected structure
  }

  const labreset = async () => {
    try {
      const response = await axios.get(
        'https://digitopia-project-backend.vercel.app/api/SSTIlab1Reset'
      );
      fetchComments();
      if (response.status === 200) {
        setResetMessage(response.data.message);
        setHtml('');
      }
    } catch (error) {
      console.error('Error resetting:', error);
      setResetMessage('Error: Could not reset.');
    }
  };

  useEffect(() => {
    fetchComments();
  }, []);

  return (
    <>
      <div className='course-blog-item'>
        <GoBackBtn />
        <ShowHint hintText={hintMessage} />
        <ThemeSwitcher />
        <div className='container'>
          <div className='row-practice'>
            <div className='card-blog-item'>
              <img src={image_1} alt='' />
              <div className='card-text-blog-item'>
                <h2>Robots in Our Lives</h2>
                <p>
                  The development of robots has significantly transformed our
                  daily lives, industries, and the global economy. Over the past
                  century, robots have evolved from simple mechanical devices
                  into highly sophisticated machines capable of performing
                  complex tasks with precision and speed. The concept of robots
                  dates back to ancient civilizations, with myths and stories
                  about automated beings. However, modern robotics began in the
                  20th century, notably in the 1950s when George Devol invented
                  the Second programmable robot called "Unimate." This marked
                  the beginning of robots being used in manufacturing,
                  especially in the automotive industry.
                </p>
                <p>
                  During the 1960s and 1970s, robots became an essential part of
                  industrial automation. They were used to perform repetitive,
                  dangerous, or labor-intensive tasks, improving efficiency and
                  safety in factories. Industrial robots, such as robotic arms,
                  revolutionized production lines, allowing for faster and more
                  consistent manufacturing processes. In recent decades,
                  robotics has entered the medical field. Robots like the Da
                  Vinci Surgical System allow surgeons to perform minimally
                  invasive surgeries with greater precision. These machines have
                  reduced recovery times for patients and improved surgical
                  outcomes. Medical robots are also used in diagnostics,
                  rehabilitation, and even drug delivery.
                </p>
                <p>
                  Beyond industry and healthcare, robots are increasingly used
                  in everyday services. Automated vacuum cleaners, lawn mowers,
                  and even robots that assist in customer service are becoming
                  more common in households and businesses. Service robots help
                  with tasks that were traditionally manual, saving time and
                  effort. The integration of artificial intelligence (AI) has
                  been a game-changer for robotics. AI allows robots to learn,
                  adapt, and perform tasks with minimal human intervention.
                  AI-driven robots are used in areas like autonomous vehicles,
                  drone technology, and customer service bots. They can process
                  large amounts of data, recognize patterns, and make decisions,
                  making them increasingly valuable in various sectors.
                </p>
                <p>
                  As robots become more advanced, they raise social and ethical
                  questions. The impact on employment, for example, is a
                  concern, as automation could replace jobs in certain
                  industries. Additionally, ethical issues arise with the use of
                  robots in warfare, law enforcement, and surveillance. Looking
                  ahead, robots will likely play an even more significant role
                  in society. We can expect advancements in humanoid robots,
                  capable of interacting with humans in natural ways. Robots
                  will continue to be integrated into smart homes, public
                  infrastructure, and even space exploration. These innovations
                  hold the promise of making life more convenient and efficient.
                </p>
                <p>
                  In conclusion, the development of robots has brought immense
                  progress, changing the way we work, heal, and live. As
                  technology continues to advance, robots will undoubtedly play
                  an even more integral role in our future.
                </p>
              </div>

              <form onSubmit={handleSubmit}>
                <textarea
                  name='content'
                  id='content'
                  placeholder='Write Your Comment...'
                  required></textarea>
                <input
                  type='name'
                  name='name'
                  placeholder='Write Your Name'
                  className='form_input'
                />
                <button type='submit' disabled={loading}>
                  {loading ? 'Submitting...' : 'Submit'}
                </button>
                {err && <span className='error'>{err}</span>}
              </form>
              <button
                onClick={labreset}
                className='reset-btn'
                style={{
                  width: 'fit-content',
                  marginTop: '20px',
                  marginLeft: '20px',
                  borderRadius: '5px',
                  left: '0',
                }}>
                Reset
              </button>
              {html && <div dangerouslySetInnerHTML={{ __html: html }}></div>}
              <div className='comment-section'>
                {comments?.map((comment) => (
                  <div key={comment.id} className='comment-card'>
                    <div className='comment-header'>
                      <img src={icon} className='icon' alt='Card' />
                      <p className='name'>{comment.name || 'Anonymous'}</p>
                    </div>
                    <p className='comment-text'>{comment.content}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
