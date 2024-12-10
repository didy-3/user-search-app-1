
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { User } from '../interfaces/User';
import { useEffect, useState } from 'react';
import { getImgById } from '../services/userService';
import image from '@/assets/no-photo.jpg'
import './Card.scss'
interface Props {
    open: boolean
    onClose: () => void
    user: User
}

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '50vw',
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};
export function Card({ open, onClose, user }: Props) {
    const [img, setImg] = useState<string>('')

    useEffect(() => {
        (async () =>
            setImg(await getImgById(user.id))
        )()
    }, [img])
    return <Modal
        open={open}
        onClose={onClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        sx={{ '.MuiBox-root': { padding: 0, borderRadius: '32px', width:'600px' } }}
    >
        <Box sx={style} >
            <div className='user-card-wrapper'>
                <div className='user-img'>
                    <img src={img == '' ? image : img} alt="" />
                </div>
                <div className='user-info-wrapper'>
                    <div className='user-info'>
                        <div className='user-main-info'>
                            <h2 className='user-name'>{user.name}</h2>
                            <h4>{user.company.name}</h4>
                        </div>
                        <div className='user-additional-info'>
                            <div>username: {user.username}</div>
                            <div>email: {user.email}</div>
                            <div>address: {user.address.zipcode}, {user.address.city} {user.address.street},</div>
                            <div>phone: {user.phone}</div>
                            <div>website: {user.website}</div>
                        </div>
                    </div>
                </div>
            </div>
        </Box>
    </Modal>
}