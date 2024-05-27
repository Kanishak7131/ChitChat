import { useState, useEffect } from 'react';
import { addMessage, client, deleteMessage, fetchAllDocuments } from '../appwriteConfig';
import Header from '../components/Header';
import useAuth from '../hooks/useAuth';



export default function Room() {
    let { user } = useAuth();
    let [message, setMessage] = useState([])
    let [body, setbody] = useState('')

    useEffect(() => {
        async function getdata() {
            let res = await fetchAllDocuments();
            console.log(res)
            setMessage(res)
        }
        getdata()
        const unsubscribe = client.subscribe(`databases.${import.meta.env.VITE_APPWRITE_DATABASE_ID}.collections.${import.meta.env.VITE_APPWRITE_MEESAGE_COLLECTION_ID}.documents`, response => {

            if (response.events.includes("databases.*.collections.*.documents.*.create")) {
                console.log('A MESSAGE WAS CREATED')
                setMessage(prevState => [response.payload, ...prevState])
            }

            if (response.events.includes("databases.*.collections.*.documents.*.delete")) {
                console.log('A MESSAGE WAS DELETED!!!')
                setMessage(prevState => prevState.filter(message => message.$id !== response.payload.$id))
            }
        });

        console.log('unsubscribe:', unsubscribe)

        return () => {
            unsubscribe();
        };
    }, [])


    console.log(user)
    async function submitHandler(e) {
        e.preventDefault();
        let payload = {
            user_id: user.$id,
            username: user.name,
            body
        }
        let res = await addMessage(payload)
        console.log(res)
        setbody('')
    }
    async function handleDelte(id) {
        let res = await deleteMessage(id)
        console.log(res)
    }
    return (

        <main className='container'>
            <Header />
            <div className='room--container'>
                <form onSubmit={submitHandler} id='message--form'>
                    <div>
                        <textarea
                            placeholder='Type message...'
                            onChange={(e) => setbody(e.target.value)}
                            maxLength="1000"
                            value={body}
                        >

                        </textarea>
                    </div>
                    <div className='send-btn--wrapper'>
                        <input className='btn btn--secondary' type='submit' value="Send" />
                    </div>

                </form>
                <div>
                    {message && message.length >= 1 && message.map((item) => (<div key={item.$id} className='message--wrapper'>
                        <div className='message--header'>
                            <p>
                                {item?.username ? item.username : 'Anonymous user'}
                                <small className='message-timestamp'>{new Date(item.$createdAt).toLocaleString()}</small>
                            </p>
                        </div>
                        <div className='btn--alignment'>
                            <div className='message--body'><span>{item.body}</span>
                            </div>
                            { }
                            {item && item.$permissions && item.$permissions.length > 0 && item.$permissions.includes(`delete(\"user:${user.$id}\")`) && < svg onClick={() => handleDelte(item.$id)} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="delete--btn">
                                <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                            </svg>}
                        </div>



                    </div>

                    ))}
                </div>
            </div>
        </main >

    )

}