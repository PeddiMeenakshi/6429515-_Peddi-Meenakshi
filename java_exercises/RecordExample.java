package java_exercises;
import java.util.List;
record Person(String name, int age) {}
public class RecordExample {
    public static void main(String[] args) {
        List<Person> people = List.of(new Person("Alice", 25), new Person("Bob", 30), new Person("Charlie", 18));

        // Filter adults using Streams
        List<Person> adults = people.stream()
                                    .filter(p -> p.age() >= 18)
                                    .toList();

        System.out.println("Adults: " + adults);
    }
}