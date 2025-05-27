package java_exercises;
// Define an interface
interface Playable {
    void play();
}

// Implement the interface in Guitar class
class Guitar implements Playable {
    public void play() {
        System.out.println("Strumming the guitar!");
    }
}

// Implement the interface in Piano class
class Piano implements Playable {
    public void play() {
        System.out.println("Playing the piano!");
    }
}

public class InterfaceExample {
    public static void main(String[] args) {
        Playable guitar = new Guitar();
        Playable piano = new Piano();

        guitar.play();
        piano.play();
    }
}