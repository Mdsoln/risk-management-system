// // import React from 'react';
// // import { Alert, Button } from 'antd';
// // import { ErrorState, FieldError } from '@/app/types/api';

// // interface ErrorDisplayAlertProps {
// //     errorState: ErrorState;
// //     onClose: () => void;
// // }

// // const ErrorDisplayAlert: React.FC<ErrorDisplayAlertProps> = ({ errorState, onClose }) => (
// //     <Alert
// //         message={errorState.message || "Error"}
// //         showIcon
// //         description={
// //             <div>
// //                 {errorState.errors && (
// //                     <ol>
// //                         {errorState.errors.map((error: FieldError, index) => (
// //                             <li key={index} style={{ marginBottom: 8 }}>
// //                                 {index + 1}. {error.message}
// //                             </li>
// //                         ))}
// //                     </ol>
// //                 )}
// //                 <p>{errorState.description}</p>
// //                 {errorState.refId && <p>Reference ID: {errorState.refId}</p>}
// //             </div>
// //         }
// //         type="error"
// //         action={
// //             <Button size="small" danger onClick={onClose}>
// //                 Close
// //             </Button>
// //         }
// //     />
// // );

// // export default ErrorDisplayAlert;
// import React from 'react';
// import { Alert, Button } from 'antd';
// import { ErrorState, FieldError } from '@/app/types/api';

// interface ErrorDisplayAlertProps {
//     errorState: ErrorState;
//     onClose: () => void;
// }

// const ErrorDisplayAlert: React.FC<ErrorDisplayAlertProps> = ({ errorState, onClose }) => (
//     <Alert
//         message={errorState.message || "Error"}
//         showIcon
//         description={
//             <div>
//                 {errorState.errors && (
//                     <ul>
//                         {errorState.errors.map((error: FieldError, index) => (
//                             <li key={index} style={{ marginBottom: 8 }}>
//                                 {error.message}
//                             </li>
//                         ))}
//                     </ul>
//                 )}
//                 <p>{errorState.description}</p>
//                 {errorState.refId && <p>Reference ID: {errorState.refId}</p>}
//                 {errorState.details && (
//                     <pre style={{ whiteSpace: 'pre-wrap', wordBreak: 'break-all', maxHeight: 200, overflow: 'auto' }}>
//                         {errorState.details}
//                     </pre>
//                 )}
//                 {errorState.stack && (
//                     <pre style={{ whiteSpace: 'pre-wrap', wordBreak: 'break-all', maxHeight: 200, overflow: 'auto' }}>
//                         {errorState.stack}
//                     </pre>
//                 )}
//             </div>
//         }
//         type="error"
//         action={
//             <Button size="small" danger onClick={onClose}>
//                 Close
//             </Button>
//         }
//     />
// );

// export default ErrorDisplayAlert;
import React from 'react';
import { Alert, Button } from 'antd';
import { ErrorState, FieldError } from '@/app/types/api';

interface ErrorDisplayAlertProps {
    errorState: ErrorState;
    onClose: () => void;
}

const ErrorDisplayAlert: React.FC<ErrorDisplayAlertProps> = ({ errorState, onClose }) => (
    <Alert
        message={errorState.message || "Error"}
        showIcon
        description={
            <div>
                {errorState.errors && (
                    <ul>
                        {errorState.errors.map((error: FieldError, index) => (
                            <li key={index} style={{ marginBottom: 8 }}>
                                {error.message}
                            </li>
                        ))}
                    </ul>
                )}
                <p>{errorState.description}</p>
                {errorState.refId && <p>Reference ID: {errorState.refId}</p>}
                {errorState.details && (
                    <pre style={{ whiteSpace: 'pre-wrap', wordBreak: 'break-all', maxHeight: 200, overflow: 'auto' }}>
                        {errorState.details}
                    </pre>
                )}
                {errorState.stack && (
                    <pre style={{ whiteSpace: 'pre-wrap', wordBreak: 'break-all', maxHeight: 200, overflow: 'auto' }}>
                        {errorState.stack}
                    </pre>
                )}
            </div>
        }
        type="error"
        action={
            <Button size="small" danger onClick={onClose}>
                Close
            </Button>
        }
    />
);

export default ErrorDisplayAlert;
