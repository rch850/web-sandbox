package main

import (
	"encoding/json"
	"fmt"
	"log"
	"net/http"
)

// Offer from clients.
type Offer struct {
	Desc struct {
		Sdp  string `json:"sdp"`
		Type string `json:"type"`
	} `json:"desc"`
	IceCandidates []struct {
		Candidate     string `json:"candidate"`
		SdpMLineIndex int    `json:"sdpMLineIndex"`
		SdpMid        string `json:"sdpMid"`
	} `json:"iceCandidates"`
}

func main() {
	var offer Offer
	var answer Offer

	// Host:
	// GET /offers (polling)
	// POST /offers/:id/answer
	//
	// Guest:
	// POST /offers
	// GET /offers/:id/answer (polling)
	http.HandleFunc("/offers", func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Access-Control-Allow-Origin", "*")
		w.Header().Set("Access-Control-Allow-Headers", "Content-Type")

		if r.Method == http.MethodOptions {
			w.Write([]byte("{}"))
		} else if r.Method == http.MethodPost {
			decoder := json.NewDecoder(r.Body)
			if err := decoder.Decode(&offer); err != nil {
				fmt.Fprintf(w, "ParseForm() err: %v", err)
				return
			}
			log.Println(offer)
			fmt.Fprintf(w, "{}")
			answer.Desc.Sdp = ""
			answer.Desc.Type = ""
		} else {
			encoder := json.NewEncoder(w)
			if offer.Desc.Type != "" {
				encoder.Encode([]Offer{offer})
			} else {
				fmt.Fprintf(w, "[]")
			}
		}
	})

	http.HandleFunc("/offers/1/answer", func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Access-Control-Allow-Origin", "*")
		w.Header().Set("Access-Control-Allow-Headers", "Content-Type")

		if r.Method == http.MethodOptions {
			w.Write([]byte("{}"))
		} else if r.Method == http.MethodPost {
			decoder := json.NewDecoder(r.Body)
			if err := decoder.Decode(&answer); err != nil {
				fmt.Fprintf(w, "ParseForm() err: %v", err)
				return
			}
			log.Println(answer)
			fmt.Fprintf(w, "{}")
			offer.Desc.Sdp = ""
			offer.Desc.Type = ""
		} else {
			encoder := json.NewEncoder(w)
			encoder.Encode(answer)
		}
	})

	http.ListenAndServeTLS(":8080", "cert.pem", "key.pem", nil)
}
