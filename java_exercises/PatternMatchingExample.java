package java_exercises;
public class PatternMatchingExample {
    public static void checkType(Object obj) {
        switch (obj) {
            case Integer i -> System.out.println("It is an Integer: " + i);
            case String s -> System.out.println("It is a String: " + s);
            case Double d -> System.out.println("It is a Double: " + d);
            default -> System.out.println("Unknown type");
        }
    }

    public static void main(String[] args) {
        checkType(42);
        checkType("Hello");
        checkType(3.14);
    }
}