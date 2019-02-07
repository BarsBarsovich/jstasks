/* ДЗ 2 - работа с массивами и объеектами */

/*
 Задание 1:

 Напишите аналог встроенного метода forEach для работы с массивами
 Посмотрите как работает forEach и повторите это поведение для массива, который будет передан в параметре array
 */
function forEach(array, fn) {

    let result = [];

    for (let i = 0; i < array.length; i++) {
        fn(array[i], i, array);
    }

    return result;
}

/*
 Задание 2:

 Напишите аналог встроенного метода map для работы с массивами
 Посмотрите как работает map и повторите это поведение для массива, который будет передан в параметре array
 */
function map(array, fn) {

    let result = [];

    for (let i = 0; i < array.length; i++) {
        result.push(fn(array[i], i, array));
    }

    return result;

}

/*
 Задание 3:

 Напишите аналог встроенного метода reduce для работы с массивами
 Посмотрите как работает reduce и повторите это поведение для массива, который будет передан в параметре array
 */
function reduce(array, fn, initial) {


}

/*
 Задание 4:

 Функция должна перебрать все свойства объекта, преобразовать их имена в верхний регистр и вернуть в виде массива

 Пример:
   upperProps({ name: 'Сергей', lastName: 'Петров' }) вернет ['NAME', 'LASTNAME']
 */
function upperProps(obj) {
    return Object.keys(obj).map(item => {
        return item.toUpperCase();
    });
}

/*
 Задание 5 *:

 Напишите аналог встроенного метода slice для работы с массивами
 Посмотрите как работает slice и повторите это поведение для массива, который будет передан в параметре array
 */
function slice(array, from, to) {

    if (from === undefined && to === undefined) {
        return array;
    }

    const arrayLength = array.length;

    if (from === undefined) {
        if (to === 0) {
            return [];
        } else if (to < 0) {
            if (Math.abs(to) > arrayLength) {
                return [];
            }

            from = 0;
            to = arrayLength - Math.abs(to);

        } else if (to > 0) {
            if (to > arrayLength) {
                return array;
            }
            from = 0;
        }
    } else if (from === 0) {
        if (to === undefined) {
            return array;
        } else if (to === 0) {
            return [];
        } else if (to < 0) {
            if (Math.abs(to) < arrayLength) {
                to = array.length - Math.abs(to);
            } else {
                return [];
            }
        } else if (to > 0) {
            if (to > arrayLength) {
                return array;
            }
        }
    } else if (from > 0) {
        if (from > arrayLength) {
            return [];
        }

        if (to === 0) {
            return [];
        } else if (to > 0 && to > arrayLength) {
            to = arrayLength;
        } else if (to < 0) {
            if (Math.abs(to) > arrayLength) {
                return [];
            }
            to = arrayLength - Math.abs(to);
        } else if (to === undefined) {
            to = arrayLength;
        }
    } else if (from < 0) {
        if (to === 0) {
            return [];
        } else if (to < 0) {
            to = arrayLength - Math.abs(to);
        } else if (to === undefined) {
            to = arrayLength;
        }
    }

    let result = [];

    for (let i = 0; i < array.length; i++) {
        if (i >= from && i < to) {
            result.push(array[i]);
        }
    }

    return result;
}

/*
 Задание 6 *:

 Функция принимает объект и должна вернуть Proxy для этого объекта
 Proxy должен перехватывать все попытки записи значений свойств и возводить это значение в квадрат
 */
function createProxy(obj) {
    let proxy = new Proxy(obj, {
        get(target, prop) {
            return target[prop];
        },
        set(target, prop, value) {
            target[prop] = value * value;

            return true;
        }
    })

    return proxy;
}

export {
    forEach,
    map,
    reduce,
    upperProps,
    slice,
    createProxy
};
