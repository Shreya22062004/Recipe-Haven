document.addEventListener('DOMContentLoaded', function () {
  // --- Data Model ---
  const STORAGE_KEYS = {
    RECIPES: 'allRecipes',
    USER_RECIPES: 'userRecipes',
    LIBRARY: 'likedRecipes'
  };

  document.getElementById('explore-recipes-btn').addEventListener('click', function (e) {
    e.preventDefault();
    document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
    document.querySelector('.nav-link[data-page="recipes"]').classList.add('active');
    Object.values(pages).forEach(page => page && (page.style.display = 'none'));
    document.getElementById('recipes-page').style.display = 'block';
    if (typeof renderRecipes === 'function') renderRecipes();
  });
 const featuredRecipes = [
    { id: 'f1', name: "Paneer Butter Masala", cuisine: "North Indian", type: "veg", image: "img/pbm.png", ingredients: ["Paneer", "Butter", "Tomatoes", "Cream", "Onion", "Ginger", "Garlic", "Garam masala"], steps: "Saute onions, ginger, garlic. Add tomatoes and spices. Blend into sauce. Add paneer and simmer with cream and butter." },
    { id: 'f2', name: "Veg Manchurian", cuisine: "Chinese", type: "veg", image: "img/manchurian.jpeg", ingredients: ["Cabbage", "Carrot", "Spring onion", "Corn flour", "Soy sauce", "Ginger", "Garlic", "Chili sauce"], steps: "Make veggie balls, fry. Prepare sauce with ginger, garlic, sauces. Toss balls in sauce." },
    { id: 'f3', name: "Margherita Pizza", cuisine: "Italian", type: "veg", image: "img/pizza.jpeg", ingredients: ["Pizza base", "Tomato sauce", "Mozzarella", "Basil", "Olive oil"], steps: "Spread sauce on base, top with cheese and basil, bake." },
    { id: 'f4', name: "Vegetable Biryani", cuisine: "North Indian", type: "veg", image: "img/biryani.jpeg", ingredients: ["Basmati rice", "Mixed vegetables", "Onion", "Tomato", "Ginger", "Garlic", "Biryani masala"], steps: "Saute onion, ginger, garlic. Add vegetables and spices. Layer with rice, cook with yogurt and herbs." },
    { id: 'f5', name: "Hakka Noodles", cuisine: "Chinese", type: "veg", image: "img/hakkaNoodles.jpeg", ingredients: ["Noodles", "Carrot", "Cabbage", "Capsicum", "Soy sauce", "Vinegar", "Pepper"], steps: "Boil noodles, stir fry veggies, add sauces and noodles, toss well." },
    { id: 'f6', name: "Macroni Pasta", cuisine: "Italian", type: "veg", image: "img/pasta.jpg", ingredients: ["Macroni", "Pasta Masala", "Sauces", "Tomato Pury", "Basic Masalas"], steps: "Boil Pasta , make the masala paste , add water and pasta , toss well" },
    { id: 'f7', name: "Pulihora", cuisine: "South Indian", type: "veg", image: "img/Pulihora.jpg", ingredients: ["Tamarind", "Rice", "Chana Dal", "Peanuts", "Oil", "Red Chilli", "Green Chilli", "Salt", "Turmeric", "Mustard", "Groundnut", "Curry Leaves", "Cashew", "Black Gram"], steps: "Prepare Rice , Heat the Pan and Put Oil , Saute it with the basic spices , Add tamarind in the Pan , Mix the Rice", },
    { id: 'f8', name: "Aloo Paratha", cuisine: "North Indian", type: "veg", image: "img/alooparatha.jpg", ingredients: ["Potato", "Flour", "Red Chilli Powder", "Turmeric", "Salt", "Jeera"], steps: "Boil Potato , Peel and Smash Potato , Knit the flour , Make balls of potato and flour , Make Rotis ", }
  ];

  // --- All Recipes (Featured + More) ---
  const allRecipes = [
    ...featuredRecipes,
    { id: 'r9', name: "Pav Bhaji", cuisine: "Indian", type: "veg", image: "img/pavbhaji.jpeg", ingredients: ["Potato", "Tomato", "Onion", "Peas", "Pav", "Butter", "Spices"], steps: "Cook and mash veggies with spices. Toast pav in butter. Serve hot." },

    // --- North Indian Veg ---
    { id: 'n1', name: "Dal Makhani", cuisine: "North Indian", type: "veg", image: "img/dalmakhani.jpeg", ingredients: ["Black lentils", "Kidney beans", "Butter", "Cream", "Tomato", "Ginger", "Garlic", "Spices"], steps: "Simmer lentils and beans with spices, finish with cream." },
    { id: 'n2', name: "Chole Bhature", cuisine: "North Indian", type: "veg", image: "img/cholebhature.jpeg", ingredients: ["Chickpeas", "Onion", "Tomato", "Ginger", "Garlic", "Spices", "Flour", "Yogurt"], steps: "Cook chickpeas with masala. Prepare dough, roll and fry bhature." },
    { id: 'n3', name: "Rajma", cuisine: "North Indian", type: "veg", image: "img/rajma.jpeg", ingredients: ["Kidney beans", "Tomato", "Onion", "Spices"], steps: "Cook beans and simmer in spiced gravy." },
    { id: 'n4', name: "Aloo Gobi", cuisine: "North Indian", type: "veg", image: "img/aloogobi.jpg", ingredients: ["Potato", "Cauliflower", "Onion", "Tomato", "Spices"], steps: "Saute potato and cauliflower with spices." },
    { id: 'n5', name: "Kadai Paneer", cuisine: "North Indian", type: "veg", image: "img/kadaipaneer.jpg", ingredients: ["Paneer", "Capsicum", "Tomato", "Onion", "Spices"], steps: "Stir-fry paneer and veggies in kadai masala." },
    { id: 'n6', name: "Baingan Bharta", cuisine: "North Indian", type: "veg", image: "img/bainganbharta.jpg", ingredients: ["Eggplant", "Onion", "Tomato", "Spices"], steps: "Roast, mash, and cook eggplant with spices." },
    { id: 'n7', name: "Jeera Aloo", cuisine: "North Indian", type: "veg", image: "img/jeeraaloo.jpg", ingredients: ["Potato", "Cumin", "Spices"], steps: "Saute boiled potatoes with cumin and spices." },
    { id: 'n8', name: "Bhindi Masala", cuisine: "North Indian", type: "veg", image: "img/bhindimasala.jpg", ingredients: ["Okra", "Onion", "Tomato", "Spices"], steps: "Saute okra with onion and tomato." },
    { id: 'n9', name: "Palak Paneer", cuisine: "North Indian", type: "veg", image: "img/palakpaneer.jpg", ingredients: ["Spinach", "Paneer", "Spices"], steps: "Blend spinach, simmer with paneer and spices." },
    { id: 'n10', name: "Methi Malai Matar", cuisine: "North Indian", type: "veg", image: "img/methimalai.jpg", ingredients: ["Fenugreek", "Peas", "Cream"], steps: "Cook peas and fenugreek in creamy gravy." },

    // --- South Indian Veg ---
    { id: 's1', name: "Masala Dosa", cuisine: "South Indian", type: "veg", image: "img/masaladosa.jpg", ingredients: ["Rice", "Urad dal", "Potato", "Spices"], steps: "Make dosa, fill with spiced potato." },
    { id: 's2', name: "Sambar", cuisine: "South Indian", type: "veg", image: "img/sambar.jpg", ingredients: ["Toor dal", "Mixed veggies", "Tamarind"], steps: "Boil dal, veggies, temper with spices." },
    { id: 's3', name: "Medu Vada", cuisine: "South Indian", type: "veg", image: "img/meduvada.jpg", ingredients: ["Urad dal", "Onion", "Spices"], steps: "Shape and deep fry batter." },
    { id: 's4', name: "Idli", cuisine: "South Indian", type: "veg", image: "img/idli.jpg", ingredients: ["Rice", "Urad dal"], steps: "Ferment and steam batter." },
    { id: 's5', name: "Rasam", cuisine: "South Indian", type: "veg", image: "img/rasam.jpg", ingredients: ["Tomato", "Tamarind", "Spices"], steps: "Boil, temper, and serve." },
    { id: 's6', name: "Avial", cuisine: "South Indian", type: "veg", image: "img/avial.jpg", ingredients: ["Mixed vegetables", "Coconut", "Yogurt"], steps: "Cook veggies, add coconut-yogurt paste." },
    { id: 's7', name: "Lemon Rice", cuisine: "South Indian", type: "veg", image: "img/lemonrice.jpg", ingredients: ["Rice", "Lemon", "Peanuts"], steps: "Temper spices, mix with rice and lemon." },
    { id: 's8', name: "Coconut Chutney", cuisine: "South Indian", type: "veg", image: "img/coconutchutney.jpg", ingredients: ["Coconut", "Chilies", "Ginger"], steps: "Grind and temper." },
    { id: 's9', name: "Vegetable Stew", cuisine: "South Indian", type: "veg", image: "img/vegstew.jpg", ingredients: ["Veggies", "Coconut milk", "Spices"], steps: "Simmer veggies in coconut milk." },
    { id: 's10', name: "Upma", cuisine: "South Indian", type: "veg", image: "img/upma.jpg", ingredients: ["Semolina", "Onion", "Spices"], steps: "Roast semolina, cook with veggies." },

    // --- Chinese Veg ---
    { id: 'c1', name: "Spring Rolls", cuisine: "Chinese", type: "veg", image: "img/springrolls.jpg", ingredients: ["Wrappers", "Mixed veggies", "Soy sauce"], steps: "Fill, roll, and deep fry." },
    { id: 'c2', name: "Schezwan Fried Rice", cuisine: "Chinese", type: "veg", image: "img/schezwanfriedrice.jpg", ingredients: ["Rice", "Veggies", "Schezwan sauce"], steps: "Stir-fry rice and veggies with sauce." },
    { id: 'c3', name: "Chili Paneer", cuisine: "Chinese", type: "veg", image: "img/chilipaneer.jpg", ingredients: ["Paneer", "Capsicum", "Onion", "Sauces"], steps: "Fry paneer, toss with sauces." },
    { id: 'c4', name: "Veg Fried Rice", cuisine: "Chinese", type: "veg", image: "img/vegfriedrice.jpg", ingredients: ["Rice", "Veggies", "Soy sauce"], steps: "Stir-fry rice with veggies and sauces." },
    { id: 'c5', name: "Gobi Manchurian", cuisine: "Chinese", type: "veg", image: "img/gobimanchurian.jpg", ingredients: ["Cauliflower", "Sauces", "Flour"], steps: "Batter, fry, and toss in sauce." },
    { id: 'c6', name: "Hot & Sour Soup", cuisine: "Chinese", type: "veg", image: "img/hotsoursoup.jpg", ingredients: ["Veggies", "Soy sauce", "Vinegar"], steps: "Cook veggies in spicy, tangy broth." },
    { id: 'c7', name: "Tofu Stir Fry", cuisine: "Chinese", type: "veg", image: "img/tofustirfry.jpg", ingredients: ["Tofu", "Veggies", "Soy sauce"], steps: "Saute tofu and veggies in sauce." },
    { id: 'c8', name: "Mapo Tofu", cuisine: "Chinese", type: "veg", image: "img/mapotofu.jpg", ingredients: ["Tofu", "Chili bean paste", "Garlic"], steps: "Simmer tofu in spicy sauce." },
    { id: 'c9', name: "Chinese Bhel", cuisine: "Chinese", type: "veg", image: "img/chinesebhel.jpg", ingredients: ["Fried noodles", "Veggies", "Sauces"], steps: "Toss fried noodles with veggies and sauce." },

    // --- Italian Veg ---
    { id: 'i1', name: "Pasta Arrabiata", cuisine: "Italian", type: "veg", image: "img/arrabiata.jpg", ingredients: ["Pasta", "Tomato", "Garlic", "Chili"], steps: "Cook pasta, toss in spicy tomato sauce." },
    { id: 'i2', name: "Lasagna", cuisine: "Italian", type: "veg", image: "img/lasagna.jpg", ingredients: ["Pasta sheets", "Cheese", "Sauce"], steps: "Layer pasta, sauce, cheese, bake." },
    { id: 'i3', name: "Risotto", cuisine: "Italian", type: "veg", image: "img/risotto.jpg", ingredients: ["Arborio rice", "Mushrooms", "Cheese"], steps: "Cook rice slowly with broth, add cheese." },
    { id: 'i4', name: "Caprese Salad", cuisine: "Italian", type: "veg", image: "img/caprese.jpg", ingredients: ["Tomato", "Mozzarella", "Basil", "Olive oil"], steps: "Layer and drizzle with oil." },
    { id: 'i5', name: "Pesto Pasta", cuisine: "Italian", type: "veg", image: "img/pestopasta.jpg", ingredients: ["Pasta", "Basil", "Pine nuts", "Cheese"], steps: "Toss pasta with pesto sauce." },
    { id: 'i6', name: "Eggplant Parmesan", cuisine: "Italian", type: "veg", image: "img/eggplantparm.jpg", ingredients: ["Eggplant", "Tomato sauce", "Cheese"], steps: "Layer fried eggplant, sauce, cheese, bake." },
    { id: 'i7', name: "Minestrone Soup", cuisine: "Italian", type: "veg", image: "img/minestrone.jpg", ingredients: ["Veggies", "Beans", "Pasta", "Broth"], steps: "Simmer all together." },
    { id: 'i8', name: "Gnocchi", cuisine: "Italian", type: "veg", image: "img/gnocchi.jpg", ingredients: ["Potato", "Flour", "Cheese", "Sauce"], steps: "Boil gnocchi, toss in sauce." },
    { id: 'i9', name: "Bruschetta", cuisine: "Italian", type: "veg", image: "img/bruschetta.jpg", ingredients: ["Bread", "Tomato", "Basil", "Garlic"], steps: "Toast bread, top with tomato mix." },
    { id: 'i10', name: "Focaccia", cuisine: "Italian", type: "veg", image: "img/focaccia.jpg", ingredients: ["Flour", "Olive oil", "Rosemary"], steps: "Bake flatbread with toppings." },

    // --- Mexican Veg ---
    { id: 'm1', name: "Veg Quesadilla", cuisine: "Mexican", type: "veg", image: "img/quesadilla.jpg", ingredients: ["Tortilla", "Cheese", "Veggies"], steps: "Fill tortilla, grill till cheese melts." },
    { id: 'm2', name: "Bean Burrito", cuisine: "Mexican", type: "veg", image: "img/beanburrito.jpg", ingredients: ["Beans", "Tortilla", "Cheese", "Salsa"], steps: "Wrap beans and toppings in tortilla." },
    { id: 'm3', name: "Chiles Rellenos", cuisine: "Mexican", type: "veg", image: "img/chilesrellenos.jpg", ingredients: ["Peppers", "Cheese", "Tomato sauce"], steps: "Stuff peppers, bake with sauce." },
    { id: 'm4', name: "Mexican Rice", cuisine: "Mexican", type: "veg", image: "img/mexicanrice.jpg", ingredients: ["Rice", "Tomato", "Corn", "Beans", "Spices"], steps: "Cook rice with veggies and spices." },
    { id: 'm5', name: "Nachos Supreme", cuisine: "Mexican", type: "veg", image: "img/nachos.jpg", ingredients: ["Tortilla chips", "Cheese", "Salsa"], steps: "Layer chips, cheese, bake, top with salsa." },
    { id: 'm6', name: "Enchiladas", cuisine: "Mexican", type: "veg", image: "img/enchiladas.jpg", ingredients: ["Tortilla", "Beans", "Cheese", "Sauce"], steps: "Roll, cover with sauce, bake." },
    { id: 'm7', name: "Sopa de Lima", cuisine: "Mexican", type: "veg", image: "img/sopadelima.jpg", ingredients: ["Lime", "Tortilla", "Veggies", "Broth"], steps: "Simmer and serve with fried tortilla strips." },
    { id: 'm8', name: "Guacamole", cuisine: "Mexican", type: "veg", image: "img/guacamole.jpg", ingredients: ["Avocado", "Tomato", "Onion", "Lime"], steps: "Mash and mix ingredients." },
    { id: 'm9', name: "Elote", cuisine: "Mexican", type: "veg", image: "img/elote.jpg", ingredients: ["Corn", "Cheese", "Chili", "Lime"], steps: "Grill corn, top with cheese, chili, lime." },
    { id: 'm10', name: "Churros", cuisine: "Mexican", type: "veg", image: "img/churros.jpg", ingredients: ["Flour", "Sugar", "Cinnamon"], steps: "Fry dough, roll in sugar/cinnamon." },

    // --- India's Fav Snacks Recipes (for allRecipes) ---

  {
    id: 'sn1',
    name: 'Samosa',
    cuisine: "India's Fav",
    type: 'veg',
    image: 'img/samosa.jpg',
    ingredients: ['Potatoes', 'Peas', 'Flour', 'Spices', 'Oil'],
    steps: 'Prepare dough, make filling with boiled potatoes and peas and spices, stuff and deep fry until golden.'
  },
  {
    id: 'sn2',
    name: 'Gup Chup (Pani Puri)',
    cuisine: "India's Fav",
    type: 'veg',
    image: 'img/gupchup.jpg',
    ingredients: ['Semolina', 'Tamarind water', 'Potatoes', 'Chickpeas', 'Spices'],
    steps: 'Make puris, prepare spicy tamarind water, fill puris with potatoes and chickpeas, serve with water.'
  },
  {
    id: 'sn3',
    name: 'Dabeli',
    cuisine: "India's Fav",
    type: 'veg',
    image: 'img/dabeli.jpg',
    ingredients: ['Bread buns', 'Potatoes', 'Tamarind chutney', 'Peanuts', 'Spices'],
    steps: 'Prepare spicy potato filling, stuff in buns with chutneys and peanuts, toast lightly.'
  },
  {
    id: 'sn4',
    name: 'Aloo Chop',
    cuisine: "India's Fav",
    type: 'veg',
    image: 'img/alochop.jpg',
    ingredients: ['Potatoes', 'Gram flour', 'Spices', 'Oil'],
    steps: 'Make spiced mashed potato balls, coat with gram flour batter, deep fry until crisp.'
  },
  {
    id: 'sn5',
    name: 'Biri Bada',
    cuisine: "India's Fav",
    type: 'veg',
    image: 'img/biribada.jpg',
    ingredients: ['Black gram dal', 'Spices', 'Oil'],
    steps: 'Soak dal, grind to paste, mix spices, shape into patties, deep fry until golden.'
  },
  {
    id: 'sn6',
    name: 'Vada Pav',
    cuisine: "India's Fav",
    type: 'veg',
    image: 'img/vadapav.jpg',
    ingredients: ['Potatoes', 'Bread buns', 'Gram flour', 'Spices', 'Oil'],
    steps: 'Make spiced potato fritters, deep fry, serve in bread buns with chutneys.'
  },
  {
    id: 'sn7',
    name: 'Kachori',
    cuisine: "India's Fav",
    type: 'veg',
    image: 'img/kachori.jpg',
    ingredients: ['Flour', 'Spiced lentil filling', 'Oil'],
    steps: 'Prepare dough, stuff with spiced lentil filling, deep fry until golden.'
  },
  {
    id: 'sn8',
    name: 'Aloo Tikki',
    cuisine: "India's Fav",
    type: 'veg',
    image: 'img/alootikki.jpg',
    ingredients: ['Potatoes', 'Spices', 'Breadcrumbs', 'Oil'],
    steps: 'Mash potatoes with spices, shape into patties, coat with breadcrumbs, shallow fry until golden.'
  },
  {
    id: 'sn9',
    name: 'Dhokla',
    cuisine: "India's Fav",
    type: 'veg',
    image: 'img/dhokla.jpg',
    ingredients: ['Gram flour', 'Yogurt', 'Spices', 'Eno', 'Oil'],
    steps: 'Mix gram flour with yogurt and spices, ferment, steam, temper with mustard seeds.'
  },
  {
    id: 'sn10',
    name: 'Pakora',
    cuisine: "India's Fav",
    type: 'veg',
    image: 'img/pakora.jpg',
    ingredients: ['Gram flour', 'Vegetables', 'Spices', 'Oil'],
    steps: 'Mix gram flour with spices and water to make batter, dip vegetables, deep fry until crisp.'
  },
  {
    id: 'sn11',
    name: 'Onion Bhaji',
    cuisine: "India's Fav",
    type: 'veg',
    image: 'img/onionbhaji.jpg',
    ingredients: ['Onions', 'Gram flour', 'Spices', 'Oil'],
    steps: 'Mix sliced onions with gram flour and spices, deep fry until golden.'
  },
  {
    id: 'sn12',
    name: 'Batata Vada',
    cuisine: "India's Fav",
    type: 'veg',
    image: 'img/batatavada.jpg',
    ingredients: ['Potatoes', 'Gram flour', 'Spices', 'Oil'],
    steps: 'Prepare spicy mashed potato balls, coat with gram flour batter, deep fry until crisp.'
  },
  {
    id: 'sn13',
    name: 'Paneer Tikka',
    cuisine: "India's Fav",
    type: 'veg',
    image: 'img/paneertikka.jpg',
    ingredients: ['Paneer', 'Yogurt', 'Spices', 'Capsicum', 'Onion'],
    steps: 'Marinate paneer and veggies in spiced yogurt, skewer and grill or bake.'
  },
  {
    id: 'sn14',
    name: 'Bhel Puri',
    cuisine: "India's Fav",
    type: 'veg',
    image: 'img/bhelpuri.jpg',
    ingredients: ['Puffed rice', 'Sev', 'Onion', 'Tomato', 'Chutneys', 'Spices'],
    steps: 'Mix puffed rice with chopped veggies, chutneys, and sev. Serve immediately.'
  },
  {
    id: 'sn15',
    name: 'Papdi Chaat',
    cuisine: "India's Fav",
    type: 'veg',
    image: 'img/papdichaat.jpg',
    ingredients: ['Papdi', 'Potatoes', 'Yogurt', 'Chutneys', 'Spices'],
    steps: 'Arrange papdi, top with potatoes, yogurt, chutneys, and spices.'
  },
  {
    id: 'sn16',
    name: 'Dahi Vada',
    cuisine: "India's Fav",
    type: 'veg',
    image: 'img/dahivada.jpg',
    ingredients: ['Urad dal', 'Yogurt', 'Chutneys', 'Spices'],
    steps: 'Fry dal balls, soak in water, squeeze, serve in yogurt with chutneys and spices.'
  },
  {
    id: 'sn17',
    name: 'Sev Puri',
    cuisine: "India's Fav",
    type: 'veg',
    image: 'img/sevpuri.jpg',
    ingredients: ['Papdi', 'Potatoes', 'Onion', 'Chutneys', 'Sev'],
    steps: 'Top papdi with potatoes, onions, chutneys, and sev.'
  },
  {
    id: 'sn18',
    name: 'Chana Chaat',
    cuisine: "India's Fav",
    type: 'veg',
    image: 'img/chanachaat.jpg',
    ingredients: ['Chickpeas', 'Onion', 'Tomato', 'Spices', 'Lemon'],
    steps: 'Mix boiled chickpeas with chopped veggies, spices, and lemon juice.'
  },
  {
    id: 'sn19',
    name: 'Mirchi Bajji',
    cuisine: "India's Fav",
    type: 'veg',
    image: 'img/mirchibajji.jpg',
    ingredients: ['Green chilies', 'Gram flour', 'Spices', 'Oil'],
    steps: 'Stuff green chilies, dip in gram flour batter, deep fry until golden.'
  },
  {
    id: 'sn20',
    name: 'Pesarattu',
    cuisine: "South Indian",
    type: 'veg',
    image: 'img/moongdalchilla.jpg',
    ingredients: ['Moong dal', 'Spices', 'Onion', 'Oil'],
    steps: 'Blend soaked moong dal, mix with spices and onion, spread on pan, cook both sides.'
  },
  {
    id: 'sn21',
    name: 'Onion Pakoda',
    cuisine: "India's Fav",
    type: 'veg',
    image: 'img/onionpakoda.jpg',
    ingredients: ['Onions', 'Gram flour', 'Spices', 'Oil'],
    steps: 'Slice onions, mix with gram flour and spices, deep fry until golden and crispy.'
  },
  {
    id: 'sn22',
    name: 'Paneer Pakora',
    cuisine: "India's Fav",
    type: 'veg',
    image: 'img/paneerpakora.jpg',
    ingredients: ['Paneer', 'Gram flour', 'Spices', 'Oil'],
    steps: 'Cube paneer, coat with spiced batter, deep fry until crisp.'
  },
  {
    id: 'sn23',
    name: 'Mirchi Vada',
    cuisine: "India's Fav",
    type: 'veg',
    image: 'img/mirchivada.jpg',
    ingredients: ['Green chilies', 'Potatoes', 'Gram flour', 'Spices', 'Oil'],
    steps: 'Stuff chilies with spiced potatoes, coat in batter, deep fry.'
  },
  {
    id: 'sn24',
    name: 'Maddur Vada',
    cuisine: "India's Fav",
    type: 'veg',
    image: 'img/maddurvada.jpg',
    ingredients: ['Rice flour', 'Semolina', 'Onions', 'Curry leaves', 'Oil'],
    steps: 'Mix flours, onions, curry leaves, shape, deep fry.'
  },
  {
    id: 'sn25',
    name: 'Bread Roll',
    cuisine: "India's Fav",
    type: 'veg',
    image: 'img/breadroll.jpg',
    ingredients: ['Bread', 'Potatoes', 'Spices', 'Oil'],
    steps: 'Fill bread with spiced potatoes, roll, deep fry.'
  },
  {
    id: 'sn26',
    name: 'Cheese Pakora',
    cuisine: "India's Fav",
    type: 'veg',
    image: 'img/cheesepakora.jpg',
    ingredients: ['Cheese', 'Gram flour', 'Spices', 'Oil'],
    steps: 'Cube cheese, coat with batter, deep fry.'
  },
  {
    id: 'sn27',
    name: 'Banana Chips',
    cuisine: "India's Fav",
    type: 'veg',
    image: 'img/bananachips.jpg',
    ingredients: ['Raw banana', 'Salt', 'Turmeric', 'Oil'],
    steps: 'Slice banana, fry, sprinkle salt and turmeric.'
  },
  {
    id: 'sn28',
    name: 'Shakarpara',
    cuisine: "India's Fav",
    type: 'veg',
    image: 'img/shakarpara.jpg',
    ingredients: ['Flour', 'Sugar', 'Ghee', 'Water'],
    steps: 'Make dough, cut, deep fry, coat in sugar syrup.'
  },
  {
    id: 'sn29',
    name: 'Namak Para',
    cuisine: "India's Fav",
    type: 'veg',
    image: 'img/namakpara.jpg',
    ingredients: ['Flour', 'Chili powder', 'Ajwain', 'Salt', 'Oil'],
    steps: 'Make dough, cut strips, deep fry until crispy.'
  },
  {
    id: 'sn30',
    name: 'Poha Chivda',
    cuisine: "India's Fav",
    type: 'veg',
    image: 'img/pohachivda.jpg',
    ingredients: ['Poha', 'Peanuts', 'Raisins', 'Curry leaves', 'Spices'],
    steps: 'Roast poha with peanuts, raisins, curry leaves, spices.'
  },
  {
    id: 'sn31',
    name: 'Chakli',
    cuisine: "India's Fav",
    type: 'veg',
    image: 'img/chakli.jpg',
    ingredients: ['Rice flour', 'Gram flour', 'Cumin seeds', 'Spices', 'Oil'],
    steps: 'Mix flours and spices, shape spirals, deep fry until crisp.'
  },
  {
    id: 'sn32',
    name: 'Kothimbir Vadi',
    cuisine: "India's Fav",
    type: 'veg',
    image: 'img/kothimbirvadi.jpg',
    ingredients: ['Coriander leaves', 'Gram flour', 'Spices', 'Oil'],
    steps: 'Mix coriander with gram flour and spices, steam, slice, and shallow fry.'
  },
  {
    id: 'sn33',
    name: 'Masala Papad',
    cuisine: "India's Fav",
    type: 'veg',
    image: 'img/masalapapad.jpg',
    ingredients: ['Papad', 'Onion', 'Tomato', 'Coriander', 'Spices'],
    steps: 'Roast papad, top with chopped veggies and spices.'
  },
  {
    id: 'sn34',
    name: 'Corn Chaat',
    cuisine: "India's Fav",
    type: 'veg',
    image: 'img/cornchaat.jpg',
    ingredients: ['Sweet corn', 'Onion', 'Tomato', 'Chaat masala', 'Lemon'],
    steps: 'Mix boiled corn with veggies, chaat masala, and lemon juice.'
  },
  {
    id: 'sn35',
    name: 'Moong Dal Pakoda',
    cuisine: "India's Fav",
    type: 'veg',
    image: 'img/moongdalpakoda.jpg',
    ingredients: ['Moong dal', 'Onion', 'Spices', 'Oil'],
    steps: 'Soak dal, grind, mix with onion and spices, deep fry spoonfuls.'
  },
  {
    id: 'sn36',
    name: 'Dal Vada',
    cuisine: "India's Fav",
    type: 'veg',
    image: 'img/dalvada.jpg',
    ingredients: ['Chana dal', 'Onion', 'Spices', 'Oil'],
    steps: 'Soak dal, grind, mix with onion and spices, shape and deep fry.'
  },
  {
    id: 'sn38',
    name: 'Sabudana Vada',
    cuisine: "India's Fav",
    type: 'veg',
    image: 'img/sabudanavada.jpg',
    ingredients: ['Sabudana', 'Potatoes', 'Peanuts', 'Spices', 'Oil'],
    steps: 'Mix soaked sabudana with potatoes, peanuts, and spices, shape and deep fry.'
  },
  {
    id: 'sn39',
    name: 'Vegetable Cutlet',
    cuisine: "India's Fav",
    type: 'veg',
    image: 'img/vegcutlet.jpg',
    ingredients: ['Mixed vegetables', 'Potatoes', 'Breadcrumbs', 'Spices', 'Oil'],
    steps: 'Mix boiled veggies, shape, coat with breadcrumbs, shallow or deep fry.'
  },
  {
    id: 'sn40',
    name: 'Hara Bhara Kabab',
    cuisine: "India's Fav",
    type: 'veg',
    image: 'img/harabharakabab.jpg',
    ingredients: ['Spinach', 'Peas', 'Potatoes', 'Spices', 'Oil'],
    steps: 'Blend spinach and peas, mix with potatoes and spices, shape and shallow fry.'
  },
  {
    id: 'sn41',
    name: 'Rava Dhokla',
    cuisine: "India's Fav",
    type: 'veg',
    image: 'img/ravadhokla.jpg',
    ingredients: ['Semolina (rava)', 'Yogurt', 'Eno', 'Spices', 'Oil'],
    steps: 'Mix rava, yogurt, spices; add Eno; steam until fluffy; temper and serve.'
  },
  {
    id: 'sn43',
    name: 'Green Pea Sandwich',
    cuisine: "India's Fav",
    type: 'veg',
    image: 'img/greenpeasandwich.jpg',
    ingredients: ['Bread', 'Green peas', 'Cucumber', 'Mayonnaise', 'Spices'],
    steps: 'Mash peas with mayo and spices; spread on bread with cucumber slices.'
  },
  {
    id: 'sn44',
    name: 'Methi Garlic Pakoda',
    cuisine: "India's Fav",
    type: 'veg',
    image: 'img/methigarlicpakoda.jpg',
    ingredients: ['Fenugreek leaves', 'Gram flour', 'Garlic', 'Spices', 'Oil'],
    steps: 'Mix all ingredients; drop spoonfuls in hot oil; fry until golden.'
  },
  {
    id: 'sn45',
    name: 'Mini Dal Pakwan Chaat',
    cuisine: "India's Fav",
    type: 'veg',
    image: 'img/dalpakwanchaat.jpg',
    ingredients: ['Chana dal', 'Pakwan', 'Onion', 'Chutney', 'Spices'],
    steps: 'Top crispy pakwan with cooked dal, onions, chutneys, and spices.'
  },
  {
    id: 'sn46',
    name: 'Veg Kathi Roll',
    cuisine: "India's Fav",
    type: 'veg',
    image: 'img/vegkathiroll.jpg',
    ingredients: ['Wheat roti', 'Mixed vegetables', 'Spices', 'Chutney'],
    steps: 'Saute veggies with spices; roll in roti with chutney.'
  },
  {
    id: 'sn47',
    name: 'Appe (Paddu)',
    cuisine: "India's Fav",
    type: 'veg',
    image: 'img/appe.jpg',
    ingredients: ['Rice', 'Urad dal', 'Veggies', 'Spices', 'Oil'],
    steps: 'Ferment batter, add veggies, pour in appe pan, cook both sides.'
  },
  {
    id: 'sn48',
    name: 'Dahi Ke Kabab',
    cuisine: "India's Fav",
    type: 'veg',
    image: 'img/dahikabab.jpg',
    ingredients: ['Hung curd', 'Gram flour', 'Onion', 'Spices'],
    steps: 'Mix all, shape kababs, shallow fry until golden.'
  },
  {
    id: 'sn49',
    name: 'Masala Corn',
    cuisine: "India's Fav",
    type: 'veg',
    image: 'img/masalacorn.jpg',
    ingredients: ['Sweet corn', 'Butter', 'Chaat masala', 'Lemon', 'Spices'],
    steps: 'Toss boiled corn with butter, spices, and lemon.'
  },
  {
    id: 'sn50',
    name: 'Veg Momos',
    cuisine: "India's Fav",
    type: 'veg',
    image: 'img/vegmomos.jpg',
    ingredients: ['Flour', 'Mixed veggies', 'Ginger', 'Garlic', 'Spices'],
    steps: 'Fill dough with spiced veggies, shape momos, steam until cooked.'
  },
  {
    id: 'sn51',
    name: 'Paneer Bread Roll',
    cuisine: "India's Fav",
    type: 'veg',
    image: 'img/paneerbreadroll.jpg',
    ingredients: ['Bread', 'Paneer', 'Spices', 'Coriander', 'Oil'],
    steps: 'Stuff bread with paneer mix, roll, shallow fry.'
  },
  {
    id: 'sn52',
    name: 'Poha Cutlet',
    cuisine: "India's Fav",
    type: 'veg',
    image: 'img/pohacutlet.jpg',
    ingredients: ['Poha', 'Potatoes', 'Spices', 'Breadcrumbs', 'Oil'],
    steps: 'Mix soaked poha, potatoes, spices; shape, coat, shallow fry.'
  },
  {
    id: 'sn53',
    name: 'Veg Galouti Kebab',
    cuisine: "India's Fav",
    type: 'veg',
    image: 'img/veggaloutikebab.jpg',
    ingredients: ['Rajma', 'Potato', 'Spices', 'Breadcrumbs', 'Oil'],
    steps: 'Mash rajma and potato, mix spices, shape, shallow fry.'
  },
  {
    id: 'sn54',
    name: 'Chilli Cheese Toast',
    cuisine: "India's Fav",
    type: 'veg',
    image: 'img/chillicheesetoast.jpg',
    ingredients: ['Bread', 'Cheese', 'Green chilli', 'Butter'],
    steps: 'Mix cheese and chillies, spread on bread, toast until golden.'
  },
  {
    id: 'sn55',
    name: 'Vegetable Puffs',
    cuisine: "India's Fav",
    type: 'veg',
    image: 'img/vegpuffs.jpg',
    ingredients: ['Puff pastry', 'Mixed veggies', 'Spices'],
    steps: 'Make veggie filling, fill pastry, bake until crisp.'
  },
  {
    id: 'sn58',
    name: 'Ragda Pattice',
    cuisine: "India's Fav",
    type: 'veg',
    image: 'img/ragdapattice.jpg',
    ingredients: ['White peas', 'Potatoes', 'Onion', 'Chutneys', 'Spices'],
    steps: 'Make potato patties, top with ragda, chutneys, onions, and sev.'
  },
  {
    id: 'sn60',
    name: 'Sabudana Khichdi Balls',
    cuisine: "India's Fav",
    type: 'veg',
    image: 'img/sabudanakhichdiballs.jpg',
    ingredients: ['Sabudana', 'Potatoes', 'Peanuts', 'Spices'],
    steps: 'Mix soaked sabudana, potatoes, peanuts, shape balls, shallow fry.'
  },

  //Desserts

  {
    id: 'ds1',
    name: 'Gulab Jamun',
    cuisine: "Desserts", // Changed here
    type: 'veg',
    image: 'img/gulabjamun.jpg',
    ingredients: ['Khoya or milk powder', 'Flour', 'Sugar', 'Cardamom', 'Rose water', 'Ghee'],
    steps: 'Make dough from khoya, shape balls, deep fry, soak in rose-cardamom sugar syrup.'
  },
  {
    id: 'ds2',
    name: 'Rasgulla',
    cuisine: "Desserts",
    type: 'veg',
    image: 'img/rasgulla.jpg',
    ingredients: ['Chhena (paneer)', 'Sugar', 'Water', 'Cardamom'],
    steps: 'Knead chhena, shape balls, cook in boiling sugar syrup until spongy.'
  },
  {
    id: 'ds3',
    name: 'Jalebi',
    cuisine: "Desserts",
    type: 'veg',
    image: 'img/jalebi.jpg',
    ingredients: ['Flour', 'Yogurt', 'Sugar', 'Saffron', 'Ghee'],
    steps: 'Make batter, ferment, pipe spirals into hot ghee, fry, soak in saffron sugar syrup.'
  },
  {
    id: 'ds4',
    name: 'Kheer (Rice Pudding)',
    cuisine: "Desserts",
    type: 'veg',
    image: 'img/kheer.jpg',
    ingredients: ['Rice', 'Milk', 'Sugar', 'Cardamom', 'Nuts', 'Saffron'],
    steps: 'Simmer rice in milk with sugar and cardamom, garnish with nuts and saffron.'
  },
  {
    id: 'ds5',
    name: 'Gajar Halwa',
    cuisine: "Desserts",
    type: 'veg',
    image: 'img/gajarhalwa.jpg',
    ingredients: ['Carrot', 'Milk', 'Sugar', 'Ghee', 'Cardamom', 'Nuts'],
    steps: 'Grate carrots, cook in milk, add sugar, ghee, cardamom, and nuts, simmer until thick.'
  },
  {
    id: 'ds6',
    name: 'Kaju Katli',
    cuisine: "Desserts",
    type: 'veg',
    image: 'img/kajukatli.jpg',
    ingredients: ['Cashew nuts', 'Sugar', 'Cardamom', 'Ghee'],
    steps: 'Grind cashews, cook with sugar and ghee, roll and cut into diamonds.'
  },
  {
    id: 'ds7',
    name: 'Rasmalai',
    cuisine: "Desserts",
    type: 'veg',
    image: 'img/rasmalai.jpg',
    ingredients: ['Chhena', 'Milk', 'Sugar', 'Cardamom', 'Saffron', 'Nuts'],
    steps: 'Make chhena balls, boil in sugar syrup, soak in saffron-flavored thickened milk.'
  },
  {
    id: 'ds8',
    name: 'Besan Ladoo',
    cuisine: "Desserts",
    type: 'veg',
    image: 'img/besanladoo.jpg',
    ingredients: ['Gram flour', 'Ghee', 'Sugar', 'Cardamom', 'Nuts'],
    steps: 'Roast gram flour in ghee, mix with sugar and cardamom, shape into balls.'
  },
  {
    id: 'ds9',
    name: 'Motichoor Ladoo',
    cuisine: "Desserts",
    type: 'veg',
    image: 'img/motichoorladoo.jpg',
    ingredients: ['Gram flour', 'Sugar', 'Cardamom', 'Ghee', 'Nuts'],
    steps: 'Make tiny boondi from gram flour, fry, soak in syrup, shape into ladoos.'
  },
  {
    id: 'ds10',
    name: 'Shrikhand',
    cuisine: "Desserts",
    type: 'veg',
    image: 'img/shrikhand.jpg',
    ingredients: ['Hung curd', 'Sugar', 'Cardamom', 'Saffron', 'Nuts'],
    steps: 'Mix hung curd with sugar, cardamom, saffron, chill and serve with nuts.'
  },
  {
    id: 'ds11',
    name: 'Malpua',
    cuisine: "Desserts",
    type: 'veg',
    image: 'img/malpua.jpg',
    ingredients: ['Flour', 'Milk', 'Sugar', 'Fennel seeds', 'Ghee'],
    steps: 'Make batter, fry spoonfuls in ghee, dip in sugar syrup.'
  },
  {
    id: 'ds12',
    name: 'Sandesh',
    cuisine: "Desserts",
    type: 'veg',
    image: 'img/sandesh.jpg',
    ingredients: ['Chhena', 'Sugar', 'Cardamom', 'Saffron'],
    steps: 'Knead chhena with sugar and cardamom, shape and garnish with saffron.'
  },
  {
    id: 'ds13',
    name: 'Coconut Barfi',
    cuisine: "Desserts",
    type: 'veg',
    image: 'img/coconutbarfi.jpg',
    ingredients: ['Coconut', 'Milk', 'Sugar', 'Cardamom'],
    steps: 'Cook coconut and milk with sugar and cardamom, set and cut into squares.'
  },
  {
    id: 'ds14',
    name: 'Rabdi',
    cuisine: "Desserts",
    type: 'veg',
    image: 'img/rabri.jpg',
    ingredients: ['Milk', 'Sugar', 'Cardamom', 'Saffron', 'Nuts'],
    steps: 'Simmer milk until thick, add sugar, cardamom, saffron, and nuts.'
  },
  {
    id: 'ds15',
    name: 'Phirni',
    cuisine: "Desserts",
    type: 'veg',
    image: 'img/phirni.jpg',
    ingredients: ['Rice', 'Milk', 'Sugar', 'Cardamom', 'Saffron', 'Nuts'],
    steps: 'Grind rice, cook in milk with sugar and cardamom, pour in bowls, chill and garnish.'
  },
  {
    id: 'ds16',
    name: 'Balushahi',
    cuisine: "Desserts",
    type: 'veg',
    image: 'img/balushahi.jpg',
    ingredients: ['Flour', 'Ghee', 'Yogurt', 'Sugar', 'Cardamom'],
    steps: 'Make dough, shape discs, deep fry, soak in sugar syrup.'
  },
  {
    id: 'ds17',
    name: 'Peda',
    cuisine: "Desserts",
    type: 'veg',
    image: 'img/peda.jpg',
    ingredients: ['Khoya', 'Sugar', 'Cardamom', 'Ghee'],
    steps: 'Cook khoya with sugar and cardamom, shape into small discs.'
  },
  {
    id: 'ds18',
    name: 'Kalakand',
    cuisine: "Desserts",
    type: 'veg',
    image: 'img/kalakand.jpg',
    ingredients: ['Milk', 'Sugar', 'Cardamom', 'Lemon juice'],
    steps: 'Crumble paneer, cook with condensed milk and sugar, set and cut into pieces.'
  },
  {
    id: 'ds19',
    name: 'Double Ka Meetha',
    cuisine: "Desserts",
    type: 'veg',
    image: 'img/doublekameetha.jpg',
    ingredients: ['Bread', 'Milk', 'Sugar', 'Ghee', 'Nuts'],
    steps: 'Fry bread, soak in sweetened milk, garnish with nuts.'
  },
  {
    id: 'ds20',
    name: 'Kesari Bath',
    cuisine: "Desserts",
    type: 'veg',
    image: 'img/kesaribath.jpg',
    ingredients: ['Semolina', 'Sugar', 'Ghee', 'Saffron', 'Nuts'],
    steps: 'Roast semolina in ghee, cook with sugar and saffron, garnish with nuts.'
  },
  {
    id: 'ds21',
    name: 'Mysore Pak',
    cuisine: "Desserts",
    type: 'veg',
    image: 'img/mysorepak.jpg',
    ingredients: ['Gram flour', 'Ghee', 'Sugar'],
    steps: 'Roast gram flour in ghee, add sugar syrup, cook until set, cut into pieces.'
  },
  {
    id: 'ds22',
    name: 'Payasam',
    cuisine: "Desserts",
    type: 'veg',
    image: 'img/payasam.jpg',
    ingredients: ['Rice', 'Milk', 'Jaggery', 'Cardamom', 'Nuts'],
    steps: 'Cook rice in milk, add jaggery and cardamom, simmer, garnish with nuts.'
  },
  {
    id: 'ds23',
    name: 'Seviyan Kheer',
    cuisine: "Desserts",
    type: 'veg',
    image: 'img/seviyankheer.jpg',
    ingredients: ['Vermicelli', 'Milk', 'Sugar', 'Cardamom', 'Nuts'],
    steps: 'Roast vermicelli, cook in milk, add sugar and cardamom, garnish with nuts.'
  },
  {
    id: 'ds24',
    name: 'Puran Poli',
    cuisine: "Desserts",
    type: 'veg',
    image: 'img/puranpoli.jpg',
    ingredients: ['Wheat flour', 'Chana dal', 'Jaggery', 'Cardamom', 'Ghee'],
    steps: 'Stuff sweet chana dal-jaggery filling in dough, roll, roast with ghee.'
  },
  {
    id: 'ds25',
    name: 'Badam Halwa',
    cuisine: "Desserts",
    type: 'veg',
    image: 'img/badamhalwa.jpg',
    ingredients: ['Almonds', 'Milk', 'Sugar', 'Ghee', 'Cardamom'],
    steps: 'Grind almonds, cook with milk, sugar, and ghee until thick.'
  },
  {
    id: 'ds26',
    name: 'Mango Shrikhand',
    cuisine: "Desserts",
    type: 'veg',
    image: 'img/mangoshrikhand.jpg',
    ingredients: ['Hung curd', 'Mango pulp', 'Sugar', 'Cardamom'],
    steps: 'Mix hung curd with mango pulp, sugar, and cardamom. Chill and serve.'
  },
  {
    id: 'ds27',
    name: 'Chenna Poda',
    cuisine: "Desserts",
    type: 'veg',
    image: 'img/chennapoda.jpg',
    ingredients: ['Chhena', 'Sugar', 'Semolina', 'Cardamom', 'Nuts'],
    steps: 'Mix chhena, sugar, semolina, cardamom, bake until golden.'
  },
  {
    id: 'ds28',
    name: 'Kharwas',
    cuisine: "Desserts",
    type: 'veg',
    image: 'img/kharwas.jpg',
    ingredients: ['Colostrum milk', 'Milk', 'Jaggery', 'Cardamom'],
    steps: 'Mix all, steam until set, cut into cubes.'
  },
  {
    id: 'ds29',
    name: 'Patishapta',
    cuisine: "Desserts",
    type: 'veg',
    image: 'img/patishapta.jpg',
    ingredients: ['Flour', 'Coconut', 'Jaggery', 'Milk'],
    steps: 'Make thin crepes, fill with coconut-jaggery, roll and serve.'
  },
  {
    id: 'ds30',
    name: 'Imarti',
    cuisine: "Desserts",
    type: 'veg',
    image: 'img/imarti.jpg',
    ingredients: ['Urad dal', 'Sugar', 'Saffron', 'Ghee'],
    steps: 'Make batter from urad dal, pipe into hot ghee, fry, soak in saffron syrup.'
  },
  {
    id: 'ds31',
    name: 'Khubani ka Meetha',
    cuisine: "Desserts",
    type: 'veg',
    image: 'img/khubanikaMeetha.jpg',
    ingredients: ['Dried apricots', 'Sugar', 'Cream', 'Nuts'],
    steps: 'Soak apricots, cook with sugar, serve with cream and nuts.'
  },
  {
    id: 'ds32',
    name: 'Basundi',
    cuisine: "Desserts",
    type: 'veg',
    image: 'img/basundi.jpg',
    ingredients: ['Milk', 'Sugar', 'Cardamom', 'Nuts'],
    steps: 'Simmer milk until thick, add sugar and cardamom, garnish with nuts.'
  },
  {
    id: 'ds33',
    name: 'Mohanthal',
    cuisine: "Desserts",
    type: 'veg',
    image: 'img/mohanthal.jpg',
    ingredients: ['Gram flour', 'Ghee', 'Sugar', 'Cardamom', 'Nuts'],
    steps: 'Roast gram flour in ghee, add sugar syrup, set and cut into pieces.'
  },
  {
    id: 'ds34',
    name: 'Kesari Phirni',
    cuisine: "Desserts",
    type: 'veg',
    image: 'img/kesarphirni.jpg',
    ingredients: ['Rice', 'Milk', 'Sugar', 'Saffron', 'Cardamom', 'Nuts'],
    steps: 'Cook ground rice in milk, add sugar, saffron, cardamom, chill and garnish.'
  },
  {
    id: 'ds35',
    name: 'Carrot Kheer',
    cuisine: "Desserts",
    type: 'veg',
    image: 'img/carrotkheer.jpg',
    ingredients: ['Carrot', 'Milk', 'Sugar', 'Cardamom', 'Nuts'],
    steps: 'Grate carrots, cook in milk, add sugar and cardamom, garnish with nuts.'
  }

  ];
  // --- Storage Helpers ---
  function getFromStorage(key, fallback = []) {
    try {
      const data = localStorage.getItem(key);
      return data ? JSON.parse(data) : fallback;
    } catch {
      return fallback;
    }
  }
  function setToStorage(key, value) {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch { }
  }

  // --- Defensive: Initialize Storage if Empty or Corrupt ---
  if (!Array.isArray(getFromStorage(STORAGE_KEYS.RECIPES))) {
    setToStorage(STORAGE_KEYS.RECIPES, allRecipes);
  }
  if (!Array.isArray(getFromStorage(STORAGE_KEYS.USER_RECIPES))) {
    setToStorage(STORAGE_KEYS.USER_RECIPES, []);
  }
  if (!Array.isArray(getFromStorage(STORAGE_KEYS.LIBRARY))) {
    setToStorage(STORAGE_KEYS.LIBRARY, []);
  }

  // --- Page Navigation ---
  const pages = {
    home: document.getElementById('home-page'),
    recipes: document.getElementById('recipes-page'),
    'your-recipes': document.getElementById('your-recipes-page'),
    library: document.getElementById('library-page')
  };

  document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', e => {
      e.preventDefault();
      document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
      link.classList.add('active');
      Object.values(pages).forEach(page => page.style.display = 'none');
      pages[link.dataset.page].style.display = 'block';
      if (link.dataset.page === 'recipes') renderRecipes();
      if (link.dataset.page === 'your-recipes') renderUserRecipes();
      if (link.dataset.page === 'library') renderLibrary();
    });
  });

  // --- Featured Recipes (Home) ---
  function renderFeatured() {
    const container = document.getElementById('featured-recipes');
    if (!container) return;
    container.innerHTML = '';
    featuredRecipes.forEach(recipe => {
      container.appendChild(createRecipeCard(recipe));
    });
  }

  // --- All Recipes (with Filters) ---
  function renderRecipes() {
    const cuisineFilterEl = document.getElementById('cuisine-filter');
    const searchBarEl = document.getElementById('search-bar');
    const cuisineFilter = cuisineFilterEl ? cuisineFilterEl.value : 'all';
    const search = searchBarEl ? searchBarEl.value.trim().toLowerCase() : '';

    let recipes = getFromStorage(STORAGE_KEYS.RECIPES, allRecipes);

    if (cuisineFilter !== 'all') {
      recipes = recipes.filter(r =>
        r.cuisine && r.cuisine.toLowerCase().replace(/\s/g, '-') === cuisineFilter
      );
    }

    if (search) {
      recipes = recipes.filter(r =>
        r.name.toLowerCase().includes(search) ||
        (Array.isArray(r.ingredients) ? r.ingredients.join(', ') : String(r.ingredients)).toLowerCase().includes(search)
      );
    }

    const container = document.getElementById('recipes-container');
    if (!container) return;
    container.innerHTML = '';
    recipes.forEach(recipe => container.appendChild(createRecipeCard(recipe)));
  }

  const cuisineFilterEl = document.getElementById('cuisine-filter');
  if (cuisineFilterEl) cuisineFilterEl.addEventListener('change', renderRecipes);
  const searchBarEl = document.getElementById('search-bar');
  if (searchBarEl) searchBarEl.addEventListener('input', renderRecipes);

  // --- User Recipes ---
  const addRecipeForm = document.getElementById('add-recipe-form');
  if (addRecipeForm) {
    addRecipeForm.addEventListener('submit', function (e) {
      e.preventDefault();
      const name = document.getElementById('your-recipe-name').value.trim();
      const cuisine = document.getElementById('your-recipe-cuisine').value.trim();
      const type = document.getElementById('your-recipe-type').value;
      const ingredients = document.getElementById('your-recipe-ingredients').value.split(',').map(i => i.trim()).filter(Boolean);
      const steps = document.getElementById('your-recipe-steps').value.trim();
      const image = document.getElementById('your-recipe-image').value.trim();
      if (!name || !cuisine || !type || !ingredients.length || !steps || !image) return alert('Please fill all fields.');
      const userRecipes = getFromStorage(STORAGE_KEYS.USER_RECIPES);
      const newRecipe = { id: 'u' + Date.now(), name, cuisine, type, ingredients, steps, image };
      userRecipes.push(newRecipe);
      setToStorage(STORAGE_KEYS.USER_RECIPES, userRecipes);
      renderUserRecipes();
      this.reset();
    });
  }
  function renderUserRecipes() {
    const container = document.getElementById('your-recipes-container');
    if (!container) return;
    const userRecipes = getFromStorage(STORAGE_KEYS.USER_RECIPES);
    container.innerHTML = '';
    userRecipes.forEach(recipe => container.appendChild(createRecipeCard(recipe, true)));
  }

  // --- Library (Liked Recipes) ---
  function renderLibrary() {
    const container = document.getElementById('library-container');
    if (!container) return;
    const liked = getFromStorage(STORAGE_KEYS.LIBRARY);
    container.innerHTML = '';
    liked.forEach(recipe => container.appendChild(createRecipeCard(recipe)));
  }

  // --- Recipe Card Component ---
  function createRecipeCard(recipe, isUser = false) {
    const card = document.createElement('div');
    card.className = 'recipe-card';

    let ingredientsArr = [];
    if (Array.isArray(recipe.ingredients)) {
      ingredientsArr = recipe.ingredients;
    } else if (typeof recipe.ingredients === 'string') {
      ingredientsArr = recipe.ingredients.split(',').map(i => i.trim()).filter(Boolean);
    }

    card.innerHTML = `
    <img src="${recipe.image}" alt="${recipe.name}" onerror="this.onerror=null;this.src='https://via.placeholder.com/260x150?text=No+Image';">
    <h3>${recipe.name}</h3>
    <div class="card-ingredients"><strong>Ingredients:</strong> ${ingredientsArr.slice(0, 3).join(', ')}${ingredientsArr.length > 3 ? '...' : ''}</div>
    <div class="card-steps"><strong>Steps:</strong> ${recipe.steps ? recipe.steps.slice(0, 60) : ''}${recipe.steps && recipe.steps.length > 60 ? '...' : ''}</div>
  `;

    card.onclick = e => {
      if (
        e.target.classList.contains('heart-btn') ||
        e.target.classList.contains('edit-btn') ||
        e.target.classList.contains('delete-btn')
      ) return;
      // Kindle-style: get all currently displayed recipes for paging
      let recipeList = [];
      const container = document.getElementById('recipes-container');
      if (container) {
        recipeList = Array.from(container.children)
          .map(cardEl => cardEl.recipeData)
          .filter(Boolean);
      }
      if (!recipeList.length) recipeList = getFromStorage(STORAGE_KEYS.RECIPES, []);
      showModal(recipe, recipeList);
    };
    card.recipeData = recipe;

    const heart = document.createElement('button');
    heart.className = 'heart-btn' + (isLiked(recipe) ? ' liked' : '');
    heart.innerHTML = '&#10084;';
    heart.title = 'Like';
    heart.onclick = function (ev) {
      ev.stopPropagation();
      toggleLike(recipe);
      this.classList.toggle('liked');
    };
    card.appendChild(heart);

    if (isUser) {
      const editBtn = document.createElement('button');
      editBtn.className = 'edit-btn';
      editBtn.innerHTML = '&#9998;';
      editBtn.title = 'Edit';
      editBtn.onclick = function (ev) {
        ev.stopPropagation();
        openEditModal(recipe);
      };
      card.appendChild(editBtn);

      const deleteBtn = document.createElement('button');
      deleteBtn.className = 'delete-btn';
      deleteBtn.innerHTML = '&#128465;';
      deleteBtn.title = 'Delete';
      deleteBtn.onclick = function (ev) {
        ev.stopPropagation();
        deleteUserRecipe(recipe.id);
      };
      card.appendChild(deleteBtn);
    }

    return card;
  }

  function toggleLike(recipe) {
    let liked = getFromStorage('likedRecipes');
    const found = liked.find(r => r.id === recipe.id);
    if (found) {
      liked = liked.filter(r => r.id !== recipe.id);
    } else {
      liked.push(recipe);
    }
    setToStorage('likedRecipes', liked);
  }

  function isLiked(recipe) {
    let liked = getFromStorage('likedRecipes');
    return liked.some(r => r.id === recipe.id);
  }

  function deleteUserRecipe(id) {
    if (confirm('Are you sure you want to delete this recipe?')) {
      let userRecipes = getFromStorage('userRecipes');
      userRecipes = userRecipes.filter(r => r.id !== id);
      setToStorage('userRecipes', userRecipes);
      renderUserRecipes();
    }
  }

  function openEditModal(recipe) {
    const modal = document.getElementById('edit-recipe-modal');
    if (!modal) return;
    document.getElementById('edit-recipe-id').value = recipe.id || '';
    document.getElementById('edit-recipe-name').value = recipe.name || '';
    document.getElementById('edit-recipe-cuisine').value = recipe.cuisine || '';
    document.getElementById('edit-recipe-type').value = recipe.type || '';
    document.getElementById('edit-recipe-image').value = recipe.image || '';
    document.getElementById('edit-recipe-ingredients').value = Array.isArray(recipe.ingredients)
      ? recipe.ingredients.join(', ')
      : (recipe.ingredients || '');
    document.getElementById('edit-recipe-steps').value = recipe.steps || '';
    modal.style.display = 'flex';
  }

  document.getElementById('close-edit-modal').onclick = function () {
    document.getElementById('edit-recipe-modal').style.display = 'none';
  };
  window.onclick = function (e) {
    const modal = document.getElementById('edit-recipe-modal');
    if (e.target === modal) modal.style.display = 'none';
  };

  document.getElementById('edit-recipe-form').onsubmit = function (e) {
    e.preventDefault();
    const id = document.getElementById('edit-recipe-id').value;
    const name = document.getElementById('edit-recipe-name').value.trim();
    const cuisine = document.getElementById('edit-recipe-cuisine').value.trim();
    const type = document.getElementById('edit-recipe-type').value.trim();
    const image = document.getElementById('edit-recipe-image').value.trim();
    const ingredients = document.getElementById('edit-recipe-ingredients').value.split(',').map(i => i.trim()).filter(Boolean);
    const steps = document.getElementById('edit-recipe-steps').value.trim();

    let userRecipes = getFromStorage('userRecipes');
    const idx = userRecipes.findIndex(r => r.id === id);
    if (idx !== -1) {
      userRecipes[idx] = { ...userRecipes[idx], name, cuisine, type, image, ingredients, steps };
      setToStorage('userRecipes', userRecipes);
      renderUserRecipes();
      document.getElementById('edit-recipe-modal').style.display = 'none';
    }
  };

  // --- Kindle-Style Modal Paging and Book UI Features ---
  let currentRecipeIndex = null;
  let currentRecipeList = [];
  let touchStartX = null;
  let touchEndX = null;

  function showModal(recipe, recipeList = null) {
    if (recipeList) {
      currentRecipeList = recipeList;
      currentRecipeIndex = recipeList.findIndex(r => r.id === recipe.id);
    } else {
      const all = getFromStorage(STORAGE_KEYS.RECIPES, []);
      currentRecipeList = all;
      currentRecipeIndex = all.findIndex(r => r.id === recipe.id);
    }

    document.getElementById('modal-image').src = recipe.image || '';
    document.getElementById('modal-title').textContent = recipe.name || '';

    // Robustly handle ingredients as array or string
    let ingredientsArr = [];
    if (Array.isArray(recipe.ingredients)) {
      ingredientsArr = recipe.ingredients;
    } else if (typeof recipe.ingredients === 'string') {
      ingredientsArr = recipe.ingredients.split(',').map(i => i.trim()).filter(Boolean);
    }
    document.getElementById('modal-ingredients').innerHTML = ingredientsArr.map(i => `<li>${i}</li>`).join('');

    document.getElementById('modal-steps').textContent = recipe.steps || '';

    // Page indicator
    let indicator = document.getElementById('page-indicator');
    if (indicator) {
      indicator.textContent = `Recipe ${currentRecipeIndex + 1} of ${currentRecipeList.length}`;
    }

    // Progress bar
    let progressDiv = document.querySelector('#modal-progress > div');
    if (progressDiv) {
      const progress = ((currentRecipeIndex + 1) / currentRecipeList.length) * 100;
      progressDiv.style.width = progress + '%';
    }

    // Table of Contents (TOC) dropdown
    let toc = document.getElementById('toc-jump');
    if (toc) {
      toc.innerHTML = currentRecipeList.map((r, i) =>
        `<option value="${i}" ${i === currentRecipeIndex ? 'selected' : ''}>${r.name}</option>`
      ).join('');
      toc.onchange = function () {
        showModal(currentRecipeList[parseInt(this.value)], currentRecipeList);
      };
    }

    document.getElementById('prev-recipe').style.display = (currentRecipeIndex > 0) ? '' : 'none';
    document.getElementById('next-recipe').style.display = (currentRecipeIndex < currentRecipeList.length - 1) ? '' : 'none';
    const modal = document.getElementById('modal');
    modal.style.display = 'flex';
    modal.classList.remove('slide-left', 'slide-right');
  }

  document.getElementById('close-modal')?.addEventListener('click', function () {
    document.getElementById('modal').style.display = 'none';
  });
  document.getElementById('prev-recipe').onclick = function(e) {
    e.stopPropagation();
    slideToRecipe(-1);
  };
  document.getElementById('next-recipe').onclick = function(e) {
    e.stopPropagation();
    slideToRecipe(1);
  };
  function slideToRecipe(direction) {
    const modal = document.getElementById('modal');
    const nextIndex = currentRecipeIndex + direction;
    if (nextIndex < 0 || nextIndex >= currentRecipeList.length) return;
    modal.classList.remove('slide-left', 'slide-right');
    modal.classList.add(direction === 1 ? 'slide-left' : 'slide-right');
    setTimeout(() => {
      showModal(currentRecipeList[nextIndex], currentRecipeList);
    }, 550);
  }
  document.addEventListener('keydown', function(e) {
    const modal = document.getElementById('modal');
    if (modal && modal.style.display === 'flex') {
      if (e.key === 'ArrowLeft') document.getElementById('prev-recipe').click();
      if (e.key === 'ArrowRight') document.getElementById('next-recipe').click();
      if (e.key === 'Escape') document.getElementById('close-modal').click();
    }
  });

  // Touch Swipe Support
  const modalContent = document.querySelector('#modal .modal-content');
  if (modalContent) {
    modalContent.addEventListener('touchstart', function(e) {
      touchStartX = e.changedTouches[0].screenX;
    });
    modalContent.addEventListener('touchend', function(e) {
      touchEndX = e.changedTouches[0].screenX;
      handleSwipe();
    });
  }
  function handleSwipe() {
    if (touchStartX !== null && touchEndX !== null) {
      const delta = touchEndX - touchStartX;
      if (Math.abs(delta) > 60) {
        if (delta > 0) document.getElementById('prev-recipe').click();
        else document.getElementById('next-recipe').click();
      }
    }
    touchStartX = null; touchEndX = null;
  }

  // --- Like/Unlike Logic ---
  function isLiked(recipe) {
    const liked = getFromStorage(STORAGE_KEYS.LIBRARY);
    return liked.some(r => r.id === recipe.id);
  }
  function toggleLike(recipe) {
    let liked = getFromStorage(STORAGE_KEYS.LIBRARY);
    if (isLiked(recipe)) {
      liked = liked.filter(r => r.id !== recipe.id);
    } else {
      liked.push(recipe);
    }
    setToStorage(STORAGE_KEYS.LIBRARY, liked);
    renderLibrary();
  }

  // --- Initial Render ---
  renderFeatured();
  renderRecipes();
  renderUserRecipes();
  renderLibrary();
});
