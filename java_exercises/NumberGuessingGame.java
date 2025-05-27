package java_exercises;
import java.util.Random;
import java.util.Scanner;

public class NumberGuessingGame {
    public static void main(String[] args) {
        Random random = new Random();
        Scanner scanner = new Scanner(System.in);

        // Generate a random number between 1 and 100
        int targetNumber = random.nextInt(100) + 1;
        int guess;

        System.out.println("Guess a number between 1 and 100!");

        // Loop until user guesses correctly
        do {
            System.out.print("Enter your guess: ");
            guess = scanner.nextInt();

            if (guess > targetNumber) {
                System.out.println("Too high! Try again.");
            } else if (guess < targetNumber) {
                System.out.println("Too low! Try again.");
            } else {
                System.out.println("Congratulations! You guessed it!");
            }
        } while (guess != targetNumber);

        scanner.close();
    }
}
