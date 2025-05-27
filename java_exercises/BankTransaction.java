package java_exercises;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;

public class BankTransaction {
    public static void main(String[] args) {
        String url = "jdbc:mysql://localhost:3306/your_database";
        String user = "your_username";
        String password = "your_password";

        try (Connection conn = DriverManager.getConnection(url, user, password)) {
            conn.setAutoCommit(false); // Start transaction

            try (PreparedStatement debitStmt = conn.prepareStatement("UPDATE accounts SET balance = balance - ? WHERE id = ?");
                 PreparedStatement creditStmt = conn.prepareStatement("UPDATE accounts SET balance = balance + ? WHERE id = ?")) {

                debitStmt.setDouble(1, 500);
                debitStmt.setInt(2, 1);
                creditStmt.setDouble(1, 500);
                creditStmt.setInt(2, 2);

                debitStmt.executeUpdate();
                creditStmt.executeUpdate();
                
                conn.commit(); // Commit if both succeed
                System.out.println("Transaction successful.");
            } catch (Exception e) {
                conn.rollback(); // Rollback if error occurs
                System.err.println("Transaction failed, rolled back.");
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}