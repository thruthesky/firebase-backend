export function hook(name, data) {
    console.log('Hook name: ', name);
    console.log('Hook data: ', data);
    if (name === 'user.router.sanitizeUserData') {
        return data['hooked'] = 'yes';
    }
    return data;
}