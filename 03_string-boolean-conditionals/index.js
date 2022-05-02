// ****************** Задача-1 *********************************
function checking_password(password) {
    if (password.length >= 4 && (password.includes('_') || password.includes('-'))) {
        console.log('Пароль', password, ', является надёжным');
    } else {
        console.log('Пароль', password, ', не является надёжным');
    }
};

checking_password(password = '1234-');
checking_password(password = '4321_');
checking_password(password = 'qaz-xsw');
checking_password(password = '_zxd');
checking_password(password = '_-a');
checking_password(password = 'qaz');
checking_password(password = '_-3');
checking_password(password = '123456789');

// ****************** Задача-2 *********************************

function conversion_to_case(str) {
    if (typeof str === 'string') {
        let first_simvol = str.substr(0, 1);
        let others_simvol = str.substr(1);

        first_simvol = first_simvol.toUpperCase();
        others_simvol = others_simvol.toLowerCase();

        let converted_str = first_simvol + others_simvol;
        console.log('------------------------------------');
        console.log('Новая преобразованная строка', converted_str);
        console.log('Старая строка', str);

        str === converted_str ? (
            console.log('Строка осталось без изменений')

        ) : (
            console.log('--------------------------------'),
            console.log(`Имя ${str} было преобразовано`)
        );

    } else {
        console.log('--------------------------------')
        console.log(`Входные данные ${str} не типа string`);
    }


}


conversion_to_case(str = 'Rsssssssss');
conversion_to_case(str = 'eWWWWWWWWWWW');
conversion_to_case(str = 11111111);
