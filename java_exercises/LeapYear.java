package java_exercises;
import java.util.Scanner;
public class LeapYear {
    public static void main(String[] args){
        System.out.print("Enter a year: ");

        Scanner sc = new Scanner(System.in);
        int year=sc.nextInt();
        boolean isLeap = (year % 4 == 0 && year % 100 != 0) || (year % 400 == 0);

        // Output the result
        if (isLeap) {
            System.out.println(year + " is a leap year.");
        } else {
            System.out.println(year + " is not a leap year.");
        }

        sc.close();

    }
}
