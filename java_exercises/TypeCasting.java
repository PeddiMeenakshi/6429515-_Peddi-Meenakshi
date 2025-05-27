package java_exercises;

public class TypeCasting {
    public static void main(String[] args) {
        // Declare a double variable
        double myDouble = 9.75;

        // Cast double to int (explicit type casting)
        int myInt = (int) myDouble;
        System.out.println("Double value: " + myDouble);
        System.out.println("Converted to int: " + myInt);

        // Declare an int variable
        int anotherInt = 7;

        // Cast int to double (implicit type casting)
        double anotherDouble = anotherInt;
        System.out.println("Integer value: " + anotherInt);
        System.out.println("Converted to double: " + anotherDouble);
    }

}
