import { StyleSheet } from "react-native";



const HomeScreenStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#222",
  },
  profileCardContainer: {
    backgroundColor: "#0a0a0a",
    borderRadius: 10,
    padding:10,
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
    shadowColor: "#ff00ca",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  profileImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 10,
  },
  profileName: {
    fontWeight: "bold",
    color: "white",

    fontSize: 16,
  },
  profileTitle: {
    fontSize: 14,
    color: "white",
    marginTop: 2,
  },
  profileButton: {
    backgroundColor: "#b82c49",
    color: "#fff",
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 5,
    marginTop: 10,
  },

  headerContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 0,
  },
  headerText: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#fff",
    fontFamily: "monospace",
  },
  carouselContainer: {
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 20,
  },
  scrollView: {
    flexDirection: "row",
    width: "100%",
  },
  image: {
    width: "100%",
    height: 200,
    resizeMode: "cover",
    borderRadius: 5,
    marginHorizontal: 2,
  },
  indicatorContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 10,
  },
  indicator: {
    height: 10,
    width: 10,
    borderRadius: 5,
    marginHorizontal: 5,
  },
  item: {
    backgroundColor: "#E06C75",
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 20,
  },
  header: {
    fontSize: 22,
    backgroundColor: "#fff",
  },
  logo:{
    width: 70,
    height: 70,
  }

});

export default HomeScreenStyles;
