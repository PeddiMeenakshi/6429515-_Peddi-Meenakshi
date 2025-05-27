package java_exercises;
import java.util.ArrayList;

public class LambdaSortExample {
    public static void main(String[] args) {
        ArrayList<String> names = new ArrayList<>();
        names.add("Meenakshi");
        names.add("Arun");
        names.add("Varun");
        names.add("Sita");

        // Sorting using lambda
        names.sort((a, b) -> a.compareTo(b));

        System.out.println("Sorted names: " + names);
    }
}