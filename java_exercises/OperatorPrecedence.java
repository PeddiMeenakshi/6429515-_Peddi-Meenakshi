package java_exercises;

public class OperatorPrecedence {
    public static void main(String[] args) {
        // Expression demonstrating operator precedence
        int result = 10 + 5 * 2;
        System.out.println("Result of 10 + 5 * 2: " + result);

        int complexResult = (10 + 5) * 2;
        System.out.println("Result of (10 + 5) * 2: " + complexResult);

        double divisionResult = 10.0 / 2 + 3 * 4;
        System.out.println("Result of 10.0 / 2 + 3 * 4: " + divisionResult);
    }

}
