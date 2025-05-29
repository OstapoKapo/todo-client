'use client';
import Image from 'next/image';
import styles from './todo.module.scss';
import { useEffect, useState } from 'react';
import { useAppSelector } from '@/store/hooks';
import { createdTodo, deleteTodo, getAllTodo } from '@/services/todo';
import { Todo } from '@/types';
const ToDoComponent = () => {

    const [createTOdoKey, setCreateTodoKey] = useState<boolean>(false);
    const [name, setName] = useState<string>('');
    const [deadline, setDeadline] = useState<string>('');
    const user = useAppSelector(state => state.user);
    const {data} = user;
    const [todos, setTodos] = useState<Todo[]>([]);

    useEffect(()=>{
        const getTodos = async () => {
            try{
                const response = await getAllTodo();
                console.log(response)
                setTodos(response || []);
            }catch (error) {
                console.error('Error fetching todos:', error);
            }
        }
        getTodos()
    },[todos])


    const handleSumbit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const now = Date.now();
        const todo = {
            name,
            deadline,
            author:data?.name, 
            createdTime: now
        }
        setName('');
        setDeadline('');
        try{
            const res = await createdTodo(todo);
            setTodos(res || []);
            setCreateTodoKey(false);
        }catch (error) {
            console.error('Error creating todo:', error);
        }
    }

    const handleDelete = async (e: React.MouseEvent<HTMLImageElement>) => {
        const todoId = (e.target as HTMLImageElement).dataset.id;
        if (!todoId) return;
        try{
           const res = await deleteTodo(todoId);
           setTodos(res || []);
        }catch(error){
            console.error('Error deleting todo:', error);
        }
    }


    return(
        <div className={styles.todoPage}>
            <h1>todo</h1>
            <div className={styles.row}>
                <div className={styles.filter}>
                    sort by:
                    <button>creation date</button>
                    <button>deadline</button>
                </div>
                <div>
                    <button onClick={()=> {setCreateTodoKey(!createTOdoKey)}}>{createTOdoKey ? 'close' : 'add'}</button>
                </div>
            </div>
                {createTOdoKey ? (
                    <div className={styles.createTodo}>
                        <form onSubmit={handleSumbit} action="post" id='todoForm'>
                            <input value={name} onChange={(e) => setName(e.target.value)} type="text"  placeholder='name' name='name'/>
                            <input value={deadline} onChange={(e) => setDeadline(e.target.value)} type="date"  placeholder='date'/>
                            <button>Create</button>
                        </form>
                    </div>
                ) : (
                    <>
                    <div className={styles.itemTittle}>
                        <p>Name</p>
                        <p>Author</p>
                        <p>Deadline</p>
                        <button>Change</button>
                        <button>Delete</button>
                    </div>
                    <div  className={styles.container}>
                        {todos.map((todo) => (
                            <div key={todo._id} className={styles.item}>
                            <p>{todo.name}</p>
                            <p>{todo.author}</p>
                            <p>{todo.deadline}</p>
                            <Image style={{display: data?.role!=='viewer' ? 'flex' : 'none'}}  src={'/icon/reload.png'} alt='changeImg' width={50} height={50}></Image>
                            <Image style={{display: data?.role==='admin' ? 'flex' : 'none'}} onClick={handleDelete} data-id={todo._id}src={'/icon/trash.png'} alt='trashImg' width={50} height={50}></Image>
                            </div>
                        ))}
                    </div>
                    </>
                )}
        </div>
    )
}

export default ToDoComponent;