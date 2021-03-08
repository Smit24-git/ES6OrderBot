const Order = require("./assignment1Order");

const OrderState = Object.freeze({
    WELCOMING:   Symbol("welcoming"),
    FOOD:   Symbol("food"),
    GROOMING_PRODUCT:   Symbol("grooming product"),
    TOYS:  Symbol("toys")
});

module.exports = class ShwarmaOrder extends Order{
    constructor(){
        super();
        this.stateCur = OrderState.WELCOMING;
        this.sPetFood = "";
        this.sGroomingProduct = "";
        this.sToys = "";
        this.sItem = "Pet Order";
        this.sPrice=0;
    }
    handleInput(sInput){
        let aReturn = [];
        switch(this.stateCur){
            case OrderState.WELCOMING:
                this.stateCur = OrderState.FOOD;
                aReturn.push("Welcome to Smit's Pet Shop.");
                aReturn.push("What pet food you want to purchase? <br/>( cat food | dog food | fish food )");
                break;
            case OrderState.FOOD:
                this.stateCur = OrderState.GROOMING_PRODUCT
                this.sPetFood = sInput;
                aReturn.push("What Grooming Product would you like for your pet?");
                this.sPrice+=10;
                break;
            case OrderState.GROOMING_PRODUCT:
                this.stateCur = OrderState.TOYS
                this.sGroomingProduct = sInput;
                aReturn.push("Would you like Toys with that?");
                this.sPrice+=15;
                break;
            case OrderState.TOYS://final stage
                this.isDone(true);
                if(sInput.toLowerCase() != "no"){
                    this.sToys = sInput;
                    this.sPrice+=5;
                }
                aReturn.push("Thank-you for your order of");
                aReturn.push(`Food: ${this.sPetFood}`);
                aReturn.push(`Grooming Product: ${this.sGroomingProduct}`);
                if(this.sToys){
                    aReturn.push(`Toys: ${this.sToys}`);
                }
                aReturn.push(`Price: ${this.sPrice}`);
                let d = new Date(); 
                d.setMinutes(d.getMinutes() + 20);
                aReturn.push(`Please pick it up at ${d.toTimeString()}`);
                break;
        }
        return aReturn;
    }
}