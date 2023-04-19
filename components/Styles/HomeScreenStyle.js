import { StyleSheet } from "react-native";



const HomeScreenStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#222",
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
    fontSize: 32,
    backgroundColor: "#fff",
  },
  logo:{
    width: 100,
    height: 100,
  }

});

export default HomeScreenStyles;
