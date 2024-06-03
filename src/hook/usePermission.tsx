import { useCallback } from 'react';
import { RootState } from '../assets/dto/data.type';
import { useSelector } from 'react-redux';

function usePermission(section: string) {
    console.log('sectionName', section);

    const rolePermission = useSelector((state: RootState) => state.rolePermission.permission);
    console.log(rolePermission);
    // const categories_page = Categories_page;

    const allowedPermission = useCallback(
        (permissionType: string) => {
            console.log('section', rolePermission);

            return rolePermission?.some(
                (role) => role.section === section && role.section_permission?.includes(permissionType)
            );
        },
        [rolePermission, section]
    );

    // console.log('allowedPermission', allowedPermission('create'));

    const superadminPermission = useSelector((state: any) => state.user.user.is_super_admin);
    // console.log('superadminPermission', superadminPermission);

    const hasEditPermission = superadminPermission || allowedPermission('write');
    const statusPermission = superadminPermission || allowedPermission('write');
    const hasDeletePermission = superadminPermission || allowedPermission('delete');
    const addItemPermission = superadminPermission || allowedPermission('create');
    
    return {
        hasEditPermission,
        statusPermission,
        hasDeletePermission,
        addItemPermission,
    };
}

export default usePermission;
