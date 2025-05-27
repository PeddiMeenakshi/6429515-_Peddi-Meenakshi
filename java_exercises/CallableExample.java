package java_exercises;
import java.util.concurrent.*;

public class CallableExample {
    public static void main(String[] args) {
        ExecutorService executor = Executors.newFixedThreadPool(3);
        Callable<String> task = () -> {
            Thread.sleep(1000);
            return "Task completed!";
        };

        Future<String> future = executor.submit(task);
        try {
            System.out.println(future.get());
        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            executor.shutdown();
        }
    }
}