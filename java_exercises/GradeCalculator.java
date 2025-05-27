package java_exercises;
import java.util.Scanner;
public class GradeCalculator {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);

        // Prompt user for marks
        System.out.print("Enter marks out of 100: ");
        int marks = scanner.nextInt();

        // Assign grades based on marks
        char grade;
        if (marks >= 90 && marks <= 100) {
            grade = 'A';
        } else if (marks >= 80) {
            grade = 'B';
        } else if (marks >= 70) {
            grade = 'C';
        } else if (marks >= 60) {
            grade = 'D';
        } else {
            grade = 'F';
        }

        // Display the result
        System.out.println("Your grade: " + grade);
        scanner.close();
    }
}
