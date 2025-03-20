import axios from 'axios';
import { X } from 'lucide-react';
import { useState } from 'react';
import Modal from 'react-modal';
import { convertDate } from '../../utils/convertDate';

const ResultsModal = ({ ResultsIsOpen, ResultsCloseModal }) => {
  const [loading, getLoading] = useState(false);
  const [results, setResults] = useState([]);

  const modalStyles = {
    overlay: {
      backgroundColor: 'rgba(0, 0, 0, 0.7)',
      zIndex: 999,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      overflow: 'hidden',
    },
    content: {
      backgroundColor: '#1e1e2e',
      border: '2px solid #4a4e69',
      borderRadius: '20px',
      padding: '40px',
      height: 'auto',
      width: '95%',
      position: 'absolute',
      top: '50%',
      left: '50%',
      bottom: 'auto',
      right: 'auto',
    },
  };

  const cleanData = () => {
    setResults([]);
    ResultsCloseModal();
  };

  const fetchResults = () => {
    try {
      const userID = localStorage.getItem('userID');
      if (!userID) {
        console.error('Error: userID is missing.');
        return;
      }
      localStorage.getItem('userID');
      getLoading(true);
      axios.get(`http://localhost:5000/api/memory/results/${userID}`).then((res) => {
        setResults(res.data.results);
        console.log('res ---->', res);
        getLoading(false);
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Modal
      isOpen={ResultsIsOpen}
      style={modalStyles}
      className='modal'
      onRequestClose={cleanData}
      onAfterOpen={fetchResults}
    >
      <button
        onClick={ResultsCloseModal}
        style={{
          position: 'absolute',
          top: '10px',
          right: '10px',
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          color: '#fff',
        }}
      >
        <X size={24} />
      </button>
      <h1 className='modal-h2'>Results</h1>
      {loading && <h2 className='modal-loading'>Data is loading...</h2>}
      {results.length > 0 && (
        <div className='scroll-table'>
          <table className='results-table'>
            <thead>
              <tr>
                <th className='center'>#</th>
                <th>date</th>
                <th>level</th>
                <th className='center'>errors</th>
                <th className='center'>time</th>
              </tr>
            </thead>
            <tbody>
              {results.map((item, i) => (
                <tr key={item._id}>
                  <td className='center'>{i}</td>
                  <td>{convertDate(item.gameDate)}</td>
                  <td>{item.difficulty}</td>
                  <td className='center'>{item.failed}</td>
                  <td className='center'>{item.timeTaken}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </Modal>
  );
};

export default ResultsModal;
