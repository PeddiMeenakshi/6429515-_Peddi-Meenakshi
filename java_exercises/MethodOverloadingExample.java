package java_exercises;
public class MethodOverloadingExample {
    // Add two integers
    public static int add(int a, int b) {
        return a + b;
    }

    // Add two doubles
    public static double add(double a, double b) {
        return a + b;
    }

    // Add three integers
    public static int add(int a, int b, int c) {
        return a + b + c;
    }

    public static void main(String[] args) {
        System.out.println("Sum of two integers: " + add(5, 10));
        System.out.println("Sum of two doubles: " + add(3.5, 2.2));
        System.out.println("Sum of three integers: " + add(1, 2, 3));
    }
}