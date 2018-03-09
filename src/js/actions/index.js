import loginUser from "../logic/loginLogic";
import createEmployee from "../logic/createEmployeeLogic";
import deleteEmployee from "../logic/deleteEmployeeLogic";
import getEmployeeKeys from "../logic/getEmployeeKeysLogic";
import fetchEmployees from "../logic/getEmployeesDataLogic";
import fetchLocks from "../logic/getLocksDataLogic";
import deleteLock from "../logic/deleteLockLogic";
import createLock from "../logic/createLockLogic";
import getLockKeys from "../logic/getLockKeysLogic";

const actions=[
    ...loginUser,
    ...createEmployee,
    ...deleteEmployee,
    ...getEmployeeKeys,
    ...fetchEmployees,
    ...fetchLocks,
    ...deleteLock,
    ...createLock,
    ...getLockKeys
];

export default actions;