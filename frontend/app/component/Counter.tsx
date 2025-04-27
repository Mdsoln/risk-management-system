// 'use client';

// import React from 'react';
// import { useSelector, useDispatch } from 'react-redux';
// import { RootState } from '../../store/store';
// import { increment, decrement } from '../../store/counterSlice';
// import { Button, Typography } from 'antd';

// const { Title } = Typography;

// const Counter: React.FC = () => {
//     const count = useSelector((state: RootState) => state.counter.value);
//     const dispatch = useDispatch();

//     return (
//         <div style={{ textAlign: 'center', marginTop: '50px' }}>
//             <Title level={2}>Counter: {count}</Title>
//             <Button type="primary" onClick={() => dispatch(increment())} style={{ margin: '0 10px' }}>
//                 Increment
//             </Button>
//             <Button type="default" onClick={() => dispatch(decrement())} style={{ margin: '0 10px' }}>
//                 Decrement
//             </Button>
//         </div>
//     );
// };

// export default Counter;
