const users = {
    lessee: { username: "tenant1", password: "password123" },
    owner: { username: "landlord1", password: "password456" }
    };

class Land {
    constructor(landId, size, location) {
    this.landId = landId;
    this.size = size;
    this.location = location;
    }

getDetails() {
    return `Land ID: ${this.landId}, Area: ${this.size} acres, Location: ${this.location}`;
    }
}

class Payment {
    constructor(amount, date, lessee, owner) {
    this.amount = amount;
    this.date = date;
    this.lessee = lessee;
    this.owner = owner;
    }

generateReceipt() {
    return `Receipt: Tenant ${this.lessee.name} paid $${this.amount} to Landlord ${this.owner.name} on ${this.date.toDateString()}.`;
    }
}


class Lease {
    constructor(leaseId, startDate, endDate, rentAmount, land, lessee, owner) {
    this.leaseId = leaseId;
    this.startDate = new Date(startDate);
    this.endDate = new Date(endDate);
    this.rentAmount = rentAmount;
    this.land = land;
    this.lessee = lessee;
    this.owner = owner;
    }

    calculateRent() {
    const duration = this.getLeaseDuration();
      return this.rentAmount * duration;
    }

    getLeaseDuration() {
    const diffTime = Math.abs(this.endDate - this.startDate);
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays / 365;
    }
}

class Lessee {
    constructor(name, contact, username, password) {
    this.name = name;
    this.contact = contact;
    this.username = username;
    this.password = password;
    }

    login(username, password) {
    if (this.username === username && this.password === password) {
        console.log(`${this.name} logged in successfully.`);
        return true;
    }
    console.log("Invalid credentials.");
    return false;
    }

    makePayment(amount, owner) {
    const payment = new Payment(amount, new Date(), this, owner);
    owner.receivePayment(amount);
    return payment;
    }
}


class Owner {
    constructor(name, contact, username, password) {
    this.name = name;
    this.contact = contact;
    this.username = username;
    this.password = password;
    }

    login(username, password) {
    if (this.username === username && this.password === password) {
        console.log(`${this.name} logged in successfully.`);
        return true;
    }
    console.log("Invalid credentials.");
    return false;
    }

    receivePayment(amount) {
    console.log(`${this.name} has received a payment of $${amount}.`);
    }
}

const land = new Land("L001", 50, "Downtown");
const lessee = new Lessee("kendo Cee", "kendo.Cee@example.com", "tenant1", "password123");
const owner = new Owner("Iheanacho kenechi", "Iheanacho.kenechi@example.com", "landlord1", "password456");


const lesseeLoggedIn = lessee.login("tenant1", "password123");
if (lesseeLoggedIn) {
    const payment = lessee.makePayment(5000, owner);
    console.log(payment.generateReceipt());

    
    const lease = new Lease("Lease001", "2025-01-01", "2026-01-01", 5000, land, lessee, owner);
    const totalRent = lease.calculateRent();
    console.log(`Total rent for the lease is: $${totalRent}`);
}


const ownerLoggedIn = owner.login("landlord1", "password456");
if (ownerLoggedIn) {
    
    owner.receivePayment(5000);
}