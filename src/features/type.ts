export interface User {
    id: string;
    name: string;
    surname: string;
    age: number;
    email: string;
    phone: string;
    password: string;
    picurl: string;
    product: [];
}

export interface Category {
    title: string;
    url: string;
    product: string[];
}

export interface Product {
    id: string;
    name: string;
    desc: string;
    year:number;
    picurl: any;
    model: string;
    userId: string;
    categoryId: string;
    price: number;
}

export interface WishList {
    productId: string;
    userId: string;
}

export interface Cart {
    productId: string;
    userId: string;
    quantity: number;
}

export enum EnumFirestore {
    USERS = 'user',
    WISHLIST='wishlist',
    CART='cart',
    PRODUCT='product',
    PHONE='phone',
    REIT = 'reit'
}

export const phone = [
    { "logo": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRBvjc0w1OkkkJWUhdXB8K1JUlBrhy90CjhdA&usqp=CAU", "name": "iPhone" },
    { "logo": "https://cdn.cdnlogo.com/logos/s/64/samsung.svg", "name": "Samsung" },
    { "logo": "https://executive-bulletin.com/wp-content/uploads/2020/02/e1gkwldo.png", "name": "Huawei" },
    // { "logo": "https://www.car-logos.org/wp-content/uploads/2011/09/aixam.png", "name": "Redmi" },
    { "logo": "https://d1yjjnpx0p53s8.cloudfront.net/styles/logo-thumbnail/s3/052016/untitled-1_5.png?itok=ZvbOcwuw", "name": "Micromax" },
    { "logo": "https://cliktodeal.com/wp-content/uploads/2020/08/nokia-logo.jpg", "name": "Nokia" },
    { "logo": "https://applestore.am/wp-content/uploads/2018/02/BlackBerry-Logo-Symbol-Vector-1.jpg", "name": "BlackBerry" },
    { "logo": "https://i.ytimg.com/vi/EphJjvrzFXA/maxresdefault.jpg", "name": "HTC" },
    { "logo": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAjVBMVEX////mABLlAADzqKrmAAb63N3ueHvpP0P0s7T97u7mAA786ur0ra/mAAvyoaPjAADqUVb2vb774+TxlJboLjTtbG/+9/fvgoX4zc751dbpQkfpPEH1uLnrVlrrXWHqTFDnFh/wjI73ycrnISjwiYvxkpToKC/mEhzufH7tbnHsZGjrW1/xmZv3xMXoNDrzkZdbAAAF+UlEQVR4nO2bDVPiMBCGYW2VVoq0fH8JqKByyv//eZe02U3SFvHOOnc47zPjjE26Sd587G4LtFoAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAXT+/qZ9A7qfCOfgZ3JxVS+2dAUHjxQOHlA4WXDxQKsQmg8b8Z59/zWYXxftXXrJ4vTeJnFdKLKZ4H/2ikf8unFV6b4hso/N+AQrkPCv9bmlTIIdOLmUmQk+QXwQcxlY3LlsaUMYWBtBFXDL9Loerj16CTpp3BwekuGc5zFom+47jtpMveK1G5EWWx2nXTtLvrc2WyuCkYujeTKZwPYza81712t+tqq40qTKj/bm2n99wbLYuSMSX0csv170PyjdeOcXpDetlIXrA4ax4cuXCkWwho9WANl8O63dGQQnqc+dbhvrCnTnF9S4+ZW//mNE+bqW/80Fa1ccCX1/ZeujJlkS6jYegbpjV7tRmFNKraH8hT+FiqTqV9eq0a36ta4nWdOgrHpmynb5hUDdcViY0orOvK7CNWGI3L1byKtK0zVutGfb4Qt0L3MrrY2cYuh7LEJhTSob4F7SJY4Ylqp+ESahWJz+2Wx0KpKVE7oH5mVOJcktiAwqQtNtPtaLSTs5FRSeE4dM/Ne+4rhrYgmoXOSiv/8+Q0pIlltHOitb31dua0Oy65mwYUynnJ9kVgkkOpt5pVOL3RlffW4eihkIytu9HVa/FY72QFmYAhDzhKMkVc2ctD6S9pt1Ma+ZcVJntTE0qE4OnNXIVvRTXZEnVk7MFa5yFCVe+45BhwqGldGcfM8idkN7cJESRutvXs5QhfVygtEzcc04B7T0SPdYgyzoFSyHGib6vZgXQoWJh/x3lt8ixji2XtF9aQ56PnDb0BhZHfrtoxA3YRO7ti1gHIEnftPkyp2qCSJTpWuV8eiGGykX/FLuZQkjWrMI5NxT7Je6F5atuYisIxVfvskmxSN4xJ7Nkn0ms+A+Jbh4GcyEdnR9IbD931NV9WSCsrISF6cTOXaEI2p6kuUtceOrcz2YwqoMrw1KBlz85IjkbkGgbzmvlqQKGpyNTufOy6DajklNpnFF6xsdekaeDJKsndMrf+ShIYZ66h7PnX71F4d/BS096G3JzmhEIz6NBXaM6TCvQJJ3vKUXGx3i2s8KF2ahpWaKLfOHJsw2synvWMQuM3o9qBvmgp7GxjObM9J5EIa9fw0KhC2fyW5cKm+GcUslMJHN8g5007UMkId5JY6HBX61RkDo5uQGwgWvhmt1vvSfRjhcGNsdq61RwQ89FLCOBPq/ONKWKuXUMOiE3HQzfXfFjxOwqOjh8qdM6WrEXCQyp2oKwWB0P9YGU3ZGQNg407B19QWHk64fy4NdYZoumNJiZJO6OQ/eOUM6JEUp6n3CRO/GGZIyt7NmWJAXGgGn1N4bD8XQebHx/uJK0ZZq1sc96XWl/ZmqlkIQjUHwvkZSXnBUerePTVenh/qxUrDDcsMCqN/E8VVu+zD2rTfiF6Xfjyezqr0C6iykMPx+PBPoq88HTJg3DRnVkyR3hXGY6WcnloXKF3EsOHqX3IuzoX8fWBcqOMg5Op3zrFksBKFlpm+dUn4Jr7klOdRWocZxS2g/ILHL5fPIg96C0vgV/UGoYVP9GAwnbQrl0I7T3OKmzTsGZ+MrIhLSa33GmmGol1Gld+odiIQuXH0mrFS/4Mf1ah8kuzsmmHvJhtz9jEy1Y2WdmwV31j2oxCNc9rf5jjAXlvE6PTCpXxq7cHwrU/zsDuR78ioYm3/tNj9XXp5xUesrAeGyF67HGyrg38b4WdG4VpmhdlA3um6NfSiMyuFpXXuvRu+nqr1NAhNYZhb1j7Wv/T31Q4+d0/O9Xq4nneX++90rrPTWrK9OWiv9bRtu6F7OlPX4yh7jSp1v6Jws8RB6c6+kbbjw3xfZrLBwovHyi8fKDw8jmt8Of/3uLn/2YGAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADgYvgNVyFiZNS+0WoAAAAASUVORK5CYII=", "name": "Lenovo" },
    // { "logo": "https://a.allegroimg.com/s1024/0c1949/40f016364d9f8b564e637d071a1d", "name": "Motorola Mobility" },
]

export interface Reit {
    id: string;
    comment: string;
    rating: number;
    userId: string;
    productId: string;
    userName: string;
    userPic: string;
}