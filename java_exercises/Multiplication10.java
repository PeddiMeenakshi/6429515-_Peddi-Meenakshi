package java_exercises;

import java.util.Scanner;

public class Multiplication10 {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);

        // Prompt user for input
        System.out.print("Enter a number: ");
        int number = scanner.nextInt();

        // Using a for loop to print multiplication table
        System.out.println("Multiplication Table for " + number + ":");
        for (int i = 1; i <= 10; i++) {
            System.out.println(number + " X " + i + " = " + (number * i));
        }

        scanner.close();
    }
}
