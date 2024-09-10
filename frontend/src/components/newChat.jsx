import { v4 as uuidv4 } from 'uuid'
import { useContext, useState } from 'react';
import ThemeContext from '../contexts/ThemeContext';
import Modal from './Modal';

const NewChat = ({socket}) => {
	const { theme } = useContext(ThemeContext);
	const [isModalOpen, setIsModalOpen] = useState(false);

	const generateChatID = () => {
		const token = window.localStorage.getItem("token");
		const newChatId = uuidv4()
	
		window.location.href = `/?chatID=${newChatId}`
		socket.emit('newChat', {chatID:newChatId, token})
	}

	return (
		<>
			<button 
				className={`px-4 py-2 rounded-full transition duration-300 ${
					theme === 'dark'
						? 'bg-orange-600 text-gray-100 hover:bg-orange-700'
						: 'bg-orange-400 text-gray-900 hover:bg-orange-500'
				}`}
				onClick={() => setIsModalOpen(true)}
			>
				New Chat +
			</button>
			<Modal
				isOpen={isModalOpen}
				onClose={() => setIsModalOpen(false)}
				onConfirm={() => {
					generateChatID();
					setIsModalOpen(false);
				}}
				title="Create New Chat"
			>
				<p>Are you sure you want to create a new chat?</p>
			</Modal>
		</>
	)
}

export default NewChat;