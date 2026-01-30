// Food categories data and mapping
const FOOD_CATEGORIES = {
    "Asian": {
        emoji: "🥢",
        subcategories: ["Japanese", "Chinese", "Korean", "Thai", "Vietnamese", "Indian", "Other Asian"]
    },
    "European": {
        emoji: "🍝",
        subcategories: ["Italian", "French", "Spanish", "German", "Other European"]
    },
    "American": {
        emoji: "🍔",
        subcategories: ["Burgers/Diners", "BBQ/Southern", "Pizza", "Sandwiches/Delis", "Steakhouse", "Other American"]
    },
    "Mexican": {
        emoji: "🌮",
        subcategories: ["Tacos", "Burritos", "Seafood/Mariscos", "Regional", "Other Mexican"]
    },
    "Mediterranean/Middle Eastern": {
        emoji: "🧆",
        subcategories: ["Israeli", "Lebanese", "Turkish", "Persian/Iranian", "Greek", "Other Mediterranean/Middle Eastern"]
    },
    "Cafes & Desserts": {
        emoji: "☕",
        subcategories: ["Coffee/Cafes", "Bakeries", "Dessert Shops", "Ice Cream", "Other Cafes & Desserts"]
    },
    "Bars & Drinks": {
        emoji: "🍸",
        subcategories: ["Cocktail Bars", "Wine Bars", "Breweries/Pubs", "Other Bars & Drinks"]
    }
};

// Category mapping from old flat categories to new hierarchical system
const CATEGORY_MAPPING = {
    // Asian - Japanese
    "Sushi": { mainCategory: "Asian", subcategory: "Japanese" },
    "Japanese": { mainCategory: "Asian", subcategory: "Japanese" },
    "Ramen": { mainCategory: "Asian", subcategory: "Japanese" },
    
    // Asian - Chinese
    "Chinese": { mainCategory: "Asian", subcategory: "Chinese" },
    "Taiwanese": { mainCategory: "Asian", subcategory: "Other Asian" },
    
    // Asian - Korean
    "Korean": { mainCategory: "Asian", subcategory: "Korean" },
    
    // Asian - Thai
    "Thai": { mainCategory: "Asian", subcategory: "Thai" },
    
    // Asian - Vietnamese
    "Vietnamese": { mainCategory: "Asian", subcategory: "Vietnamese" },
    
    // Asian - Indian
    "Indian": { mainCategory: "Asian", subcategory: "Indian" },
    
    // Asian - Other
    "Other Asian": { mainCategory: "Asian", subcategory: "Other Asian" },
    
    // European - Italian
    "Italian": { mainCategory: "European", subcategory: "Italian" },
    "Pizza": { mainCategory: "American", subcategory: "Pizza" },
    
    // European - French
    "French": { mainCategory: "European", subcategory: "French" },
    
    // European - Spanish
    "Spanish": { mainCategory: "European", subcategory: "Spanish" },
    
    // European - German
    "German": { mainCategory: "European", subcategory: "German" },
    
    // European - Other
    "Other European": { mainCategory: "European", subcategory: "Other European" },
    
    // American
    "American": { mainCategory: "American", subcategory: "Other American" },
    "Burgers": { mainCategory: "American", subcategory: "Burgers/Diners" },
    "Diner": { mainCategory: "American", subcategory: "Burgers/Diners" },
    "BBQ": { mainCategory: "American", subcategory: "BBQ/Southern" },
    "Sandwich": { mainCategory: "American", subcategory: "Sandwiches/Delis" },
    "Deli": { mainCategory: "American", subcategory: "Sandwiches/Delis" },
    "Steakhouse": { mainCategory: "American", subcategory: "Steakhouse" },
    
    // Mexican
    "Mexican": { mainCategory: "Mexican", subcategory: "Other Mexican" },
    "Tacos": { mainCategory: "Mexican", subcategory: "Tacos" },
    "Burritos": { mainCategory: "Mexican", subcategory: "Burritos" },
    
    // Mediterranean/Middle Eastern
    "Mediterranean": { mainCategory: "Mediterranean/Middle Eastern", subcategory: "Other Mediterranean/Middle Eastern" },
    "Greek": { mainCategory: "Mediterranean/Middle Eastern", subcategory: "Greek" },
    "Middle Eastern": { mainCategory: "Mediterranean/Middle Eastern", subcategory: "Other Mediterranean/Middle Eastern" },
    "Israeli": { mainCategory: "Mediterranean/Middle Eastern", subcategory: "Israeli" },
    "Lebanese": { mainCategory: "Mediterranean/Middle Eastern", subcategory: "Lebanese" },
    "Turkish": { mainCategory: "Mediterranean/Middle Eastern", subcategory: "Turkish" },
    "Persian": { mainCategory: "Mediterranean/Middle Eastern", subcategory: "Persian/Iranian" },
    "Iranian": { mainCategory: "Mediterranean/Middle Eastern", subcategory: "Persian/Iranian" },
    
    // Cafes & Desserts
    "Coffee": { mainCategory: "Cafes & Desserts", subcategory: "Coffee/Cafes" },
    "Cafe": { mainCategory: "Cafes & Desserts", subcategory: "Coffee/Cafes" },
    "Bakery": { mainCategory: "Cafes & Desserts", subcategory: "Bakeries" },
    "Dessert": { mainCategory: "Cafes & Desserts", subcategory: "Dessert Shops" },
    "Ice Cream": { mainCategory: "Cafes & Desserts", subcategory: "Ice Cream" },
    
    // Bars & Drinks
    "Cocktail Bar": { mainCategory: "Bars & Drinks", subcategory: "Cocktail Bars" },
    "Wine Bar": { mainCategory: "Bars & Drinks", subcategory: "Wine Bars" },
    "Brewery": { mainCategory: "Bars & Drinks", subcategory: "Breweries/Pubs" },
    "Pub": { mainCategory: "Bars & Drinks", subcategory: "Breweries/Pubs" },
    "Bar": { mainCategory: "Bars & Drinks", subcategory: "Other Bars & Drinks" },
    
    // Special cases that need user review
    "Peruvian": { mainCategory: "Asian", subcategory: "Other Asian" }, // Peruvian is South American, placing in Other Asian temporarily
    "Caribbean": { mainCategory: "American", subcategory: "Other American" }, // Caribbean - placing in Other American temporarily
    "Haitian": { mainCategory: "American", subcategory: "Other American" }, // Haitian - placing in Other American temporarily
};

// Subcategory emoji mapping
const SUBCATEGORY_EMOJI = {
    // Asian
    "Japanese": "🇯🇵",
    "Chinese": "🇨🇳",
    "Korean": "🇰🇷",
    "Thai": "🇹🇭",
    "Vietnamese": "🇻🇳",
    "Indian": "🇮🇳",
    "Other Asian": "🌏",
    
    // European
    "Italian": "🇮🇹",
    "French": "🇫🇷",
    "Spanish": "🇪🇸",
    "German": "🇩🇪",
    "Other European": "🇪🇺",
    
    // American
    "Burgers/Diners": "🍔",
    "BBQ/Southern": "🍖",
    "Pizza": "🍕",
    "Sandwiches/Delis": "🥪",
    "Steakhouse": "🥩",
    "Other American": "🇺🇸",
    
    // Mexican
    "Tacos": "🌮",
    "Burritos": "🌯",
    "Seafood/Mariscos": "🦐",
    "Regional": "🌵",
    "Other Mexican": "🌶️",
    
    // Mediterranean/Middle Eastern
    "Israeli": "🇮🇱",
    "Lebanese": "🇱🇧",
    "Turkish": "🇹🇷",
    "Persian/Iranian": "🇮🇷",
    "Greek": "🇬🇷",
    "Other Mediterranean/Middle Eastern": "🧆",
    
    // Cafes & Desserts
    "Coffee/Cafes": "☕",
    "Bakeries": "🥐",
    "Dessert Shops": "🍰",
    "Ice Cream": "🍦",
    "Other Cafes & Desserts": "🍪",
    
    // Bars & Drinks
    "Cocktail Bars": "🍸",
    "Wine Bars": "🍷",
    "Breweries/Pubs": "🍺",
    "Other Bars & Drinks": "🥃"
};

// Helper function to get category info from a flat category string
function getCategoryInfo(flatCategory) {
    if (!flatCategory) return { mainCategory: null, subcategory: null };
    const normalized = flatCategory.trim();
    return CATEGORY_MAPPING[normalized] || { mainCategory: null, subcategory: null };
}

// Helper function to get emoji for subcategory
function getSubcategoryEmoji(subcategory) {
    return SUBCATEGORY_EMOJI[subcategory] || "🍽️";
}

// Helper function to get emoji for main category
function getMainCategoryEmoji(mainCategory) {
    return FOOD_CATEGORIES[mainCategory]?.emoji || "🍽️";
}

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        FOOD_CATEGORIES,
        CATEGORY_MAPPING,
        SUBCATEGORY_EMOJI,
        getCategoryInfo,
        getSubcategoryEmoji,
        getMainCategoryEmoji
    };
}
