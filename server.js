const express = require('express');
const app = express();


const RESTAURANT = {
    name: 'The Green Byte Bistro',
    isOpen: true,
    address: '742 Evergreen Rd, Mapleview, OS 45502',
    phone: '555-321-9876',
    menu: [
      { 
        id: 1,
        name: 'Quantum Quinoa Mushroom Burger',
        price: 13.00,
        rating: 4,
        category: 'mains',
        details: 'A vegetarian burger made with a quinoa and mushroom patty, it will take you to another realm.'
      },
      { 
        id: 2,
        name: 'Binary Berry Cheesecake',
        price: 10.11,
        rating: 3,
        category: 'desserts',
        details: 'A creamy cheesecake bursting with flavor. A mix of berries in every byte.'
      },
      { 
        id: 3,
        name: 'Recursive Rigatoni',
        price: 17.00,
        rating: 5,
        category: 'mains',
        details: 'A classic rigatoni pasta dish, layered with rich tomato sauce and herbs. You\'ll keep coming back for more.'
      },
      { 
        id: 4,
        name: 'Pumpkin Pi Squared',
        price: 3.14,
        rating: 5,
        category: 'desserts',
        details: 'A delightful pumpkin dessert, squared and spiced to perfection.'
      },
      { 
        id: 5,
        name: 'Fibonacci String Bean Fries',
        price: 11.23,
        rating: 5,
        category: 'sides',
        details: 'Crispy and lightly seasoned string bean fries, served in a pattern for a fun twist.'
      }
    ]
  }

//pokemon exercise 21 helped me with this one
const groupedByCategory = (arr) => {
    return arr.reduce((accumulator, currentItem) => {
        const category = currentItem.category

        //initialize the accumulator if it hasnt been
        if(!accumulator[category]) accumulator[category] = []

        //if it exist then simply put the current item
        accumulator[category].push(currentItem)

        return accumulator

    }, {})
}

const groupedByCategoryObjects = groupedByCategory(RESTAURANT.menu)

//so i can get the key names
// console.log(Object.keys(groupedByCategoryObjects))
// console.log(Object.values(groupedByCategoryObjects))

app.get('/', (req, res) => {
  return res.render('home.ejs', { restaurant: RESTAURANT });
});

app.get('/menu', (req, res) => {
    return res.render('menu.ejs', { menu: groupedByCategoryObjects})
})

app.get('/menu/:category', (req, res) => {
    const { category } = req.params

    //if the category does NOT exist in the groupedByCategoryObjects do a guard let
    //https://coreui.io/blog/how-to-check-if-a-key-exists-in-javascript-object/#:~:text=The%20in%20Operator%3A%20A%20Preliminary%20Check,-One%20of%20the&text=To%20verify%20the%20presence%20of,and%20effective%20for%20quick%20checks.
    const message = `Category:${category.charAt(0).toUpperCase() + category.slice(1)} is not yet in our Menu`
    if( !(category in groupedByCategoryObjects)) return res.render('notyet.ejs', {message})
         

    //provide only the menu base on the category from the params
    //sorry if i did not use the for loop or the .filter() method instead
    //i utilized my existing groupedByCategory on line 70 and just simply call the object and its array value
    //like so { mains: [{name: '', price: ... etc}] }
    const menuItems = groupedByCategoryObjects[category]

    //but here is using the .filter()
    const menuItems2 = RESTAURANT.menu.filter( item => item.category === category )
    //this will contain the same thing as line 96 or null
    //console.log(menuItems2)

    //using for loop
    const menuItems3 = []
    for (let index = 0; index < RESTAURANT.menu.length; index++) {
        const element = RESTAURANT.menu[index];

        if(element.category === category) menuItems3.push(element)
        
    }
    //console.log(menuItems3)

    return res.render('category.ejs', { menuItems, category })
})

app.listen(3000);
