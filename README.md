# UML-Project
**Title:** Land Lease System. <br />
**Description:** It is a system where land is leased to a lessee by the owner. It manage the geographical location of the land, size of the land and the cost per unit of land area 

* ### Land:
> Represents the piece of land being leased.
* ### Tenant: 
> The person or organization leasing the land.
* ### Landlord:
> The person or entity who owns the land and leases it out.
* ### Lease:
> The agreement between the landlord and tenant.
* ### Payment:
> A payment made by the tenant to the landlord.<br />
### UML Class Diagram <br />
This is the UML class diagram [google](https://lucid.app/lucidchart/2fb3d703-9eb1-460b-8a2b-c367962c36a2/edit?viewport_loc=-2148%2C-188%2C2982%2C1260%2C4QyKV6NsbbFE&invitationId=inv_a03f0449-cdb4-4e47-830d-13c784b2ef72) <br />

### Explanation of the UML Class Diagram:
**Users:** We simulate a mock database for users, which includes tenant and landlord with pre-defined credentials. Login() method is used to authenticate a user's credentials. If they match the stored username and password, the user is logged in.
**Land:** Stores details of the land, such as its landID, size, location. The getDatails() method returns a description of the land.

**Lease:** It includes the leaseId, startDate, endDate, rentAmount, land, lessee and the owner. It has methods to calculateRent() method calculate the rent cost and getLeaseDuration() to caculate the duration.

**Lessee:** It contains the name, contact details, username and password. It has a method login and makePayment() to initiate a payment to the owner.

**Owner:** It contains the name, contact details, username and password with a method to login and receivePayment() to acknowledge payments from lessee.

**Payment:** It stores the payment amount, the payment date, lessee and the owner. It has a method makePayment and getDatails() method returns a description of the payment.

### Code Implementation:
```javascript
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
```
