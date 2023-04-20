import React from "react";
import {
  Text,
  View,
  StyleSheet,
  ImageBackground,
  Image,
  Linking,
  TouchableOpacity,
  ScrollView,
} from "react-native";

const AboutScreen = () => {
  const openMap = () => {
    Linking.openURL(
      "https://www.google.com/maps/place/Joey's+Ink+(Joeys+Tatooist)/@14.8513575,120.261475,19z/data=!4m14!1m7!3m6!1s0x33967131557e2461:0x1b165f452f1d3276!2sJoey's+Ink+(Joeys+Tatooist)!8m2!3d14.8515558!4d120.2615783!16s%2Fg%2F11s2_cypm2!3m5!1s0x33967131557e2461:0x1b165f452f1d3276!8m2!3d14.8515558!4d120.2615783!16s%2Fg%2F11s2_cypm2"
    );
  };
  const openFacebook = () => {
    Linking.openURL("https://www.facebook.com/joeys.tattooist");
  };
  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <ImageBackground
          source={require("../assets/images/map.png")}
          resizeMode="cover"
          style={styles.map}
        >
          <View style={styles.logoContainer}>
            <TouchableOpacity onPress={openFacebook}>
              <Image
                source={require("../assets/images/logo-icon.png")}
                resizeMode="contain"
                style={styles.logo}
              />
            </TouchableOpacity>
          </View>
        </ImageBackground>
        <TouchableOpacity onPress={openMap} style={styles.button}>
          <Text style={styles.buttonText}>Get Directions</Text>
        </TouchableOpacity>

        <View style={styles.textContainer}>

        <Text style={styles.title}>Welcome to Joey's Ink</Text>
        <Text style={styles.subtitle}>
          The Premier Appointment App for Tattoo Enthusiasts
        </Text>

        <View style={styles.profileInfoContainer}>
          <View style={styles.profileContainer}>
            <Image
              source={require("../assets/images/image1.jpg")}
              resizeMode="contain"
              style={styles.profile}
            />
          </View>
          <View style={styles.infoContainer}>
            <Text style={styles.info}>
              Welcome to Joey's Ink, the premier appointment app for tattoo
              enthusiasts in Del Pilar Street, Bo. Barretto, Olongapo City,
              Zambales, Philippines. Our shop is owned and operated by the
              talented Joey Agrabio, who is not only the owner but also the
              artist behind every stunning tattoo creation.
            </Text>
            <Text style={styles.info}>
              At Joey's Ink, we understand the importance of personalized and
              professional tattoo services, which is why we strive to make every
              client's experience unforgettable. We believe that every tattoo is
              a unique work of art that deserves to be treated with the utmost
              care and attention to detail . That's why we work closely with our
              clients to ensure that their vision is brought to life in the form
              of a stunning and meaningful tattoo.
            </Text>
            <Text style={styles.info}>
              Our studio boasts state-of-the-art equipment, a comfortable and
              welcoming atmosphere, and a team of talented artists who are
              passionate about their craft. Whether you're looking for a small
              and simple design or a large and intricate piece, we have the
              skills and expertise to make your tattoo dreams a reality.
            </Text>
            <Text style={styles.info}>
              So why wait? Book your appointment with us today and experience
              the Joey's Ink difference for yourself. We can't wait to bring
              your tattoo vision to life and make your experience with us a
              memorable one.
            </Text>
          </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#222",
  },
  scrollView: {
    paddingHorizontal: 0,
    paddingBottom: 40,
  },
  map: {
    height: 200,
    width: "100%",
    justifyContent: "flex-end",
  },
  textContainer:{
    paddingHorizontal: 10,
  },
  logoContainer: {
    backgroundColor: "#222",
    alignSelf: "flex-start",
    padding: 5,
    borderRadius: 5,
    marginHorizontal: 10,
    marginBottom: 10,
  },
  logo: {
    width: 40,
    height: 40,
  },
  button: {
    backgroundColor: "#8C633F",
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 20,
    alignSelf: "center",
    marginVertical: 20,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginTop: 20,
    marginBottom: 10,
    color: "#fff",
  },
  subtitle: {
    fontSize: 18,
    color: "#fff",

    fontStyle: "italic",
    marginBottom: 20,
  },
  profileInfoContainer: {
    flexDirection: "row",
    marginTop: 20,

  },
  profileContainer: {
    flex: .8,
  },
  profile: {
    width: "100%",
    height: 200,
    borderRadius: 5,
  },
  infoContainer: {
    flex: 1.2,
    paddingHorizontal: 10,
  },
  info: {
    color: "#fff",
    fontSize: 11,
    marginBottom: 10,
    lineHeight: 22,
  },
});

export default AboutScreen;
