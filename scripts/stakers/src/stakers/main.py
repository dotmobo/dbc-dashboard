import configparser
import requests
import datetime


def run():
    config = configparser.ConfigParser()
    config.read("config.ini")
    api_url = config["api"]["url"]
    tikidy_sc = config["sc"]["tikidy"]
    tikidy_url = "{}/accounts/{}/transactions?size=10000&status=success&order=asc&function=stake%2Cunstake".format(
        api_url, tikidy_sc
    )

    print("Generating stakers report for tikidy")
    print("=================================")
    print("SC: {}\n".format(tikidy_sc))
    tikidy_resume = []
    tikidy_response = requests.get(tikidy_url)
    for tx in tikidy_response.json():
        fun = tx.get("function")
        sender = tx.get("sender")
        nbr = len(tx.get("action").get("arguments").get("transfers"))
        if fun == "stake":
            tikidy_resume.append((sender, nbr, "Tikidy"))
        elif fun == "unstake":
            tikidy_resume = list(filter(lambda x: x[0] != sender, tikidy_resume))

    # Fusion of both
    resume = tikidy_resume

    # List to csv
    csv = "type,address,nfts\n"
    for item in resume:
        csv += "{},{},{}\n".format(item[2], item[0], item[1])

    # write the csv in a file in the same directory with the date in the name
    file_name = "stakers_{}.csv".format(datetime.datetime.now().strftime("%Y-%m-%d"))
    with open(file_name, "w") as f:
        f.write(csv)

    print("Done!")


if __name__ == "__main__":
    run()
