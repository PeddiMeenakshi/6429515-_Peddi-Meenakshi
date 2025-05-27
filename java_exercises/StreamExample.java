package java_exercises;
import java.util.List;
import java.util.stream.Collectors;
import java.util.Arrays;

public class StreamExample {
    public static void main(String[] args) {
        List<Integer> numbers = Arrays.asList(10, 15, 8, 7, 20, 33, 50);

        List<Integer> evenNumbers = numbers.stream()
                                           .filter(n -> n % 2 == 0)
                                           .collect(Collectors.toList());

        System.out.println("Even numbers: " + evenNumbers);
    }
}