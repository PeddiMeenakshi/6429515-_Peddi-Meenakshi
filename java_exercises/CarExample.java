package java_exercises;
class Car {
    String make, model;
    int year;

    Car(String make, String model, int year) {
        this.make = make;
        this.model = model;
        this.year = year;
    }

    void displayDetails() {
        System.out.println("Car Details: " + year + " " + make + " " + model);
    }
}

public class CarExample {
    public static void main(String[] args) {
        Car car1 = new Car("Toyota", "Corolla", 2022);
        Car car2 = new Car("Ford", "Mustang", 2021);

        car1.displayDetails();
        car2.displayDetails();
    }
}