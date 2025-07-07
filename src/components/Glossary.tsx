export enum SemesterNames {
    Spring = "Spring",
    SpringFirstEight = "Spring - First 8 Weeks",
    SpringSecondEight = "Spring - Second 8 Weeks",
    Summer = "Summer",
    Fall = "Fall",
    FallFirstEight = "Fall - First 8 Weeks",
    FallSecondEight = "Fall - Second 8 Weeks"
}

export enum SemesterOrders {
    Spring = 1,
    SpringFirstEight = 2,
    SpringSecondEight = 3,
    Summer = 4,
    Fall = 5,
    FallFirstEight = 6,
    FallSecondEight = 7
}

export function SemesterOrderToName(order:SemesterOrders){
    switch(order){
        case SemesterOrders.Spring:
            return SemesterNames.Spring;
        case SemesterOrders.SpringFirstEight:
            return SemesterNames.SpringFirstEight;
        case SemesterOrders.SpringSecondEight:
            return SemesterNames.SpringSecondEight;
        case SemesterOrders.Summer:
            return SemesterNames.Summer;
        case SemesterOrders.Fall:
            return SemesterNames.Fall;
        case SemesterOrders.FallFirstEight:
            return SemesterNames.FallFirstEight;
        case SemesterOrders.FallSecondEight:
            return SemesterNames.FallSecondEight;
    }
}

export function SemesterNameToOrder(name:SemesterNames){
    switch(name){
        case SemesterNames.Spring:
            return SemesterOrders.Spring;
        case SemesterNames.SpringFirstEight:
            return SemesterOrders.SpringFirstEight;
        case SemesterNames.SpringSecondEight:
            return SemesterOrders.SpringSecondEight;
        case SemesterNames.Summer:
            return SemesterOrders.Summer;
        case SemesterNames.Fall:
            return SemesterOrders.Fall;
        case SemesterNames.FallFirstEight:
            return SemesterOrders.FallFirstEight;
        case SemesterNames.FallSecondEight:
            return SemesterOrders.FallSecondEight;
    }
}

export enum DeliveryOptions {
    Online = "Online",
    HF = "HighFlex",
    Campus = "On-Campus",
    Evening = "Evening"
}

export class Offering {
    Delivery:DeliveryOptions;
    SemesterOrder:SemesterOrders;
    public constructor(semesterOrder:SemesterOrders, delivery:DeliveryOptions){
        this.Delivery = delivery;
        this.SemesterOrder = semesterOrder;
    }
}