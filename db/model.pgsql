
CREATE TYPE paymentMethodEnums AS ENUM ('CASH', 'CREDIT', 'ONLINE_PORTAL', 'BANK_CARD');
CREATE TYPE orderStatusEnums AS ENUM ('IN_PROGRESS', 'FINISHED', 'CANCELED', 'SENDING');

drop table if exists orderItem;
drop table if exists accountOrder;
drop table if exists discountCode;
drop table if exists comment;
drop table if exists account;
drop table if exists product;

create table account (
    id serial primary key,
    name text not null,
    lastname text not null,
    email text not null,
    phoneNumber text not null,
    password text not null,
    createdAt timestamptz not null default now(),
    updatedAt timestamptz
);

create table product (
    id serial primary key,
    name text not null,
    description text not null,
    status boolean default true,
    image text not null,
    price decimal not null,
    discount decimal not null,
    createdAt timestamptz not null default now(),
    updatedAt timestamptz
);

create table comment (
    id serial primary key,
    title text not null,
    description text not null,
    image text not null,
    account int not null references account(id),
    product int not null references product(id),
    createdAt timestamptz not null default now(),
    updatedAt timestamptz
);

create table discountCode (
    id serial primary key,
    code text not null,
    amount int not null,
    expirationDate timestamptz,
    createdAt timestamptz not null default now(),
    updatedAt timestamptz
);

create table accountOrder (
    id serial primary key,
    account int not null references account(id),
    paymentMethod paymentMethodEnums,
    orderStatus orderStatusEnums,
    discountCode int references discountCode(id),
    createdAt timestamptz not null default now(),
    updatedAt timestamptz

);

create table orderItem (
    id serial primary key,
    account int not null references account(id),
    accountOrder int not null references accountOrder(id),
    product int not null references product(id),
    quantity int not null,
    createdAt timestamptz not null default now(),
    updatedAt timestamptz
);



insert into account(name, lastname, email,phoneNumber, password) values('فاطمه', 'صاحبی', 'fateme@gmail.com','09130602241','f123456');
insert into account(name, lastname, email,phoneNumber, password) values('پوریا', 'جهاندیده', 'pouria@gmail.com', '09109904585','p123456');

insert into product(name, description, status,image, price, discount) values('ساعت مچی رولکس ۳۴۰۳', 'ضدآب - تمام استیل - ضمانت ۱۲ ماهه', true,'',12000000,100000);
insert into product(name, description, status,image, price, discount) values('ساعت مچی کاسیو ۹۳۴۳', 'ضدآب - تمام استیل - ضمانت ۱۲ ماهه', true,'',8500000,0);

insert into comment(title, description,image,account,product) values('تجربه استفاده ساعت مچی کاسیو ۹۳۴۳', 'کیفیت بسیار بالا','',1,1);

insert into discountCode(code, amount, expirationDate) values('JFDVF43', 10,'2025-12-10T07:23:41.296+00:00');




